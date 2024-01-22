'use client';
import React, { useTransition } from 'react';
import { FaRegHeart, FaHeartBroken, FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { toast } from 'sonner';

('sonner');

import { Button, cn } from '@streamzio/ui';
import { User } from '@streamzio/db';

import { onFollow, onUnfollow } from '@/actions/follow';

type Props = {
    isFollowing: boolean;
    userId: string;
};

const Actions = ({ isFollowing, userId }: Props) => {
    const [isPending, startTransition] = useTransition();
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data: { following: User }) => {
                    toast.success('Followed', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `You are now following ${data.following.username}`
                    });
                })
                .catch(() => {
                    toast.error('Error', {
                        position: 'top-center',
                        icon: <IoCloseCircle className="w-4 h-4 text-red-600" />,
                        description: 'Something went wrong!'
                    });
                });
        });
    };
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data: { following: User }) => {
                    toast.success('Unfollowed', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `You are now not following ${data.following.username}`
                    });
                })
                .catch(() => {
                    toast.error('Error', {
                        position: 'top-center',
                        icon: <IoCloseCircle className="w-4 h-4 text-red-600" />,
                        description: 'Something went wrong!'
                    });
                });
        });
    };
    const followButtonHandler = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };
    return (
        <div className="flex">
            <Button
                className={cn('flex gap-2', { 'cursor-progress': isPending })}
                variant={isFollowing ? 'secondary' : 'default'}
                disabled={isPending}
                onClick={followButtonHandler}
            >
                {isFollowing ? (
                    <>
                        <FaHeartBroken className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        Follow <FaRegHeart className="w-4 h-4" />
                    </>
                )}
            </Button>
        </div>
    );
};

export default Actions;
