'use client';
import React from 'react';
import Link from 'next/link';

const UserError = () => {
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
