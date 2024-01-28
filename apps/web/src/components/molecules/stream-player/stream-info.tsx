'use client';
import React from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';

import { Separator } from '@streamzio/ui';
import { Stream } from '@streamzio/db';
import Image from 'next/image';
import UpdateDialog from './update-dialog';

type Props = {
    stream: Stream;
};

const StreamInfo = ({ stream }: Props) => {
    return (
        <div className="px-6">
            <div className="bg-card py-6 rounded-xl flex flex-col gap-4">
                <div className="flex px-6">
                    <div className="flex-1 flex gap-4">
                        <div className="w-12 h-12 aspect-square cursor-default flex items-center justify-center rounded-lg bg-primary">
                            <MdOutlineModeEdit className="h-7 w-7" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg lg:text-2xl capitalize">
                                Edit your stream info
                            </h1>
                            <h1 className="text-sm lg:text-lg capitalize text-foreground/40">
                                Maximize your visibility
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-end lg:justify-center">
                        <UpdateDialog
                            initialName={stream.name}
                            initialThumbnailUrl={stream.thumbnailUrl}
                        />
                    </div>
                </div>
                <Separator className="bg-hover" />
                <div className="flex flex-col gap-4 px-6">
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-foreground/40">Name</h4>
                        <h2 className="text-xl">{stream.name}</h2>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-foreground/40">Thumbnail</h4>
                        {stream.thumbnailUrl ? (
                            <Image
                                width={600}
                                height={450}
                                alt={stream.name}
                                src={stream.thumbnailUrl || ''}
                            />
                        ) : (
                            <h2>No thumbnail</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamInfo;
