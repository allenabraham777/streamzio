'use client';
import React from 'react';

import { FullUser } from '@/types';
import { FaCircleCheck } from 'react-icons/fa6';
import UpdateDialog from './bio-dialog';

type Props = {
    user: FullUser;
    followersCount: number;
    isHost?: boolean;
};

function UserInfo({ user, followersCount, isHost }: Props) {
    return (
        <div className="px-6">
            <div className="bg-card py-6 rounded-xl flex flex-col gap-4">
                <div className="flex px-6">
                    <div className="flex-1 flex gap-2 items-center">
                        <h1 className="text-base lg:text-2xl">About {user.username}</h1>
                        <FaCircleCheck className="text-primary h-4 w-4 lg:!h-5 lg:!w-5" />
                    </div>
                    {isHost && (
                        <div className="flex items-center justify-end lg:justify-center">
                            <UpdateDialog initialBio={user.bio} />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-6 text-sm">
                        <span className="font-bold text-sm">
                            {Intl.NumberFormat('en-US', {
                                notation: 'compact',
                                maximumFractionDigits: 1
                            }).format(followersCount)}
                        </span>
                        <span className="text-base text-foreground/40">
                            {followersCount === 1 ? 'follower' : 'followers'}
                        </span>
                    </div>
                    <div className="px-6 text-sm">{user.bio || 'No bio.'}</div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
