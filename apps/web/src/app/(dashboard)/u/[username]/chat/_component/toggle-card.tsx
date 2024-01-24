'use client';
import React, { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

import { Switch } from '@streamzio/ui';
import { Stream } from '@streamzio/db';

import { updateStream } from '@/actions/stream';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

type Props = {
    label: string;
    value: boolean;
    field: FieldTypes;
};

const ToggleCard = (props: Props) => {
    const [isPending, setTransition] = useTransition();
    const onCheckedChange = useCallback(() => {
        setTransition(() => {
            updateStream({ [props.field]: !props.value })
                .then((data: Stream) => {
                    toast.success('Updated', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `Updated ${props.label} settings for stream ${data.name}`
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
    }, [props]);
    return (
        <div className="py-6 px-10 rounded-xl bg-card flex justify-between">
            <h3 className="text-xl">{props.label}</h3>
            <Switch disabled={isPending} checked={props.value} onCheckedChange={onCheckedChange} />
        </div>
    );
};

export default ToggleCard;
