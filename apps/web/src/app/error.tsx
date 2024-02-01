'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

const UserError = ({ error }: Props) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <h2 className="text-xl text-foreground/60">Something went wrong!</h2>
            <Link
                className="text-base rounded-lg p-2 border border-foreground hover:bg-foreground hover:text-background"
                href="/"
            >
                Go back home
            </Link>
        </div>
    );
};

export default UserError;
