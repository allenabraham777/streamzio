import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="w-full px-2 py-1 bg-card border-b-2 dark:border-b-background flex justify-between items-center gap-4">
            <span>
                <Link href="/">
                    <Image src="/logo.png" width={40} height={40} alt="Streamzio" />
                </Link>
            </span>
            <div className="flex-1"></div>
            <span className="w-[40px]">
                <UserButton afterSignOutUrl="/signin" />
            </span>
        </nav>
    );
};

export default Navbar;
