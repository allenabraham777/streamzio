import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { LuClapperboard } from 'react-icons/lu';

import { getSelf } from '@/services/self';

import Search from './search';

const Navbar = async () => {
    const self = await getSelf();
    const dashboardUrl = `/u/${self.username}`;
    return (
        <nav className="w-full px-2 py-1 bg-card border-b-2 dark:border-b-background flex justify-between items-center gap-6">
            <span>
                <Image src="/logo.png" width={40} height={40} alt="Streamzio" />
            </span>
            <div className="flex-1 flex justify-center items-center">
                <Search />
            </div>
            <Link href={dashboardUrl} className="flex gap-2 items-center">
                <LuClapperboard className="w-6 h-6" />
                <span className="hidden lg:block">Dashboard</span>
            </Link>
            <span className="w-[40px]">
                <UserButton afterSignOutUrl="/signin" />
            </span>
        </nav>
    );
};

export default Navbar;
