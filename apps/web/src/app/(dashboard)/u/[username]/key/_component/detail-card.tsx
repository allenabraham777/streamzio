'use client';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

import { Button, Input, cn } from '@streamzio/ui';

import CopyButton from './copy-button';

type Props = {
    type?: 'text' | 'password';
    label: string;
    url: string | null;
};

const UrlCard = ({ label, type = 'text', url }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="py-4 lg:!py-6 px-4 lg:!px-10 rounded-xl bg-card grid grid-cols-12 items-center gap-2 lg:!gap-4">
            <h3 className="text-base lg:text-xl col-span-12 lg:col-span-2">{label}</h3>
            <div className="col-span-12 lg:col-span-10 flex gap-3 items-center">
                <Input
                    className={cn({
                        'truncate text-ellipsis': type !== 'password' || showPassword
                    })}
                    type={showPassword ? 'text' : type}
                    value={url as string}
                    readOnly
                />
                <Button
                    variant="outline"
                    className={cn({ hidden: type !== 'password' })}
                    onClick={() => setShowPassword((password) => !password)}
                >
                    <FaEye />
                </Button>
                <CopyButton value={url} />
            </div>
        </div>
    );
};

export default UrlCard;
