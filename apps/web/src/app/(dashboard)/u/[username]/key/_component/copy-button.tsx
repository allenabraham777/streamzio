'use client';
import React, { useCallback, useState } from 'react';
import { LuCopy, LuCheckCircle } from 'react-icons/lu';

import { Button } from '@streamzio/ui';

type Props = {
    value: string | null;
};

const CopyButton = ({ value }: Props) => {
    const [copied, setCopied] = useState(false);
    const Icon = copied ? LuCheckCircle : LuCopy;

    const onCopy = useCallback(() => {
        if (!value) return;

        setCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }, [value]);

    return (
        <Button size="sm" title="Copy" onClick={onCopy}>
            <Icon />
        </Button>
    );
};

export default CopyButton;
