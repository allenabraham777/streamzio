'use client';
import React, { useTransition } from 'react';

import { Button } from '@streamzio/ui';
import { onUnblock } from '@/actions/block';
import { User } from '@streamzio/db';
import { toast } from 'sonner';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

type Props = {
    userId: string;
};

const UnblockButton = ({ userId }: Props) => {
    const [isPending, startTransition] = useTransition();
    const unblockUser = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data: { blocked: User }) => {
                    toast.success('Unblocked', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `You have now unblocked ${data.blocked.username}`
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
    return (
        <Button disabled={isPending} variant="outline" onClick={unblockUser}>
            Unblock
        </Button>
    );
};

export default UnblockButton;
