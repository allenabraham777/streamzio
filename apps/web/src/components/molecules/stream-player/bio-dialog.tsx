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
import { toast } from 'sonner';

import { updateUser } from '@/actions/user';

type Props = {
    initialBio: string | null;
};

const UpdateDialog = ({ initialBio }: Props) => {
    const [bio, setBio] = useState(initialBio);
    const [isPending, startTransition] = useTransition();
    const ref = useRef<HTMLButtonElement>(null);

    const save = () => {
        startTransition(() => {
            updateUser({ bio })
                .then(() => {
                    toast.success('Stream updated');
                    ref?.current?.click();
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
                    <DialogTitle>Update youur bio</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Label>Bio</Label>
                        <Input
                            disabled={isPending}
                            onChange={(e) => setBio(e.target.value)}
                            value={bio || ''}
                            className="border-foreground h-30"
                        />
                    </div>
                </div>
                <DialogFooter className="!justify-between mt-6 gap-4">
                    <DialogClose ref={ref} asChild>
                        <Button
                            disabled={isPending}
                            variant="outline"
                            className="border-foreground"
                        >
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
