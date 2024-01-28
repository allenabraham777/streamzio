'use client';
import { useRef, useState, useTransition } from 'react';
import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Button,
    Label,
    Input
} from '@streamzio/ui';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import Image from 'next/image';
import ToolTip from '../tooltip';
import { BiTrash } from 'react-icons/bi';
import { UploadDropzone } from '@/lib/utils/uploadthing';
import { useRouter } from 'next/navigation';

type Props = {
    initialName: string;
    initialThumbnailUrl: string | null;
};

const UpdateDialog = ({ initialName, initialThumbnailUrl }: Props) => {
    const router = useRouter();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [isPending, startTransition] = useTransition();
    const ref = useRef<HTMLButtonElement>(null);

    const save = () => {
        if (!name) return;
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success('Stream updated');
                    ref?.current?.click();
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    const onRemoveThumbnail = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success('Thumbnail removed');
                    setThumbnailUrl(null);
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            disabled={isPending}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="border-foreground"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <ToolTip message="Remove thumbnail" side="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemoveThumbnail}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <BiTrash className="h-4 w-4" />
                                        </Button>
                                    </ToolTip>
                                </div>
                                <Image
                                    alt="Thumbnail"
                                    src={thumbnailUrl}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <UploadDropzone
                                endpoint="imageUploader"
                                appearance={{
                                    label: {
                                        color: '#FFFFFF'
                                    },
                                    allowedContent: {
                                        color: '#FFFFFF'
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    setThumbnailUrl(res?.[0]?.url);
                                    router.refresh();
                                    ref?.current?.click();
                                }}
                            />
                        )}
                    </div>
                </div>
                <DialogFooter className="!justify-between mt-6 gap-4">
                    <DialogClose ref={ref} asChild>
                        <Button variant="outline" className="border-foreground">
                            Close
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} onClick={save}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateDialog;
