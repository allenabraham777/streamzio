import Link from 'next/link';
import React from 'react';

const UserNotFound = () => {
    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-3xl">Page not found</h1>
                <h2 className="text-xl text-foreground/60">
                    The page you are looking for does not exist
                </h2>
            </div>
            <Link
                className="text-base rounded-lg p-2 border border-foreground hover:bg-foreground hover:text-background"
                href="/"
            >
                Go back home
            </Link>
        </div>
    );
};

export default UserNotFound;
