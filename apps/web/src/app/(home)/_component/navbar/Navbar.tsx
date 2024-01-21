import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Search from './search';

const Navbar = () => {
    return (
        <nav className="w-full px-2 py-1 bg-card border-b-2 dark:border-b-background flex justify-between items-center gap-4">
            <span>
                <Image src="/logo.png" width={40} height={40} alt="Streamzio" />
            </span>
            <div className="flex-1 flex justify-center items-center">
                <Search />
            </div>
            <span className="w-[40px]">
                <UserButton afterSignOutUrl="/signin" />
            </span>
        </nav>
    );
};

export default Navbar;
