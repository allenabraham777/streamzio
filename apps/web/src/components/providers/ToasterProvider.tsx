'use client';
import React from 'react';
import { useTheme } from 'next-themes';

import { Toaster, ToasterProps } from '@streamzio/ui';

type Props = {
    children: React.ReactNode;
};

const ToasterProvider = ({ children }: Props) => {
    const { theme = 'system' } = useTheme();
    return (
        <>
            {children}
            <Toaster theme={theme as ToasterProps['theme']} />
        </>
    );
};

export default ToasterProvider;
