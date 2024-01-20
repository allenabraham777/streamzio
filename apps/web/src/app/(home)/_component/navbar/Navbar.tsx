import React from 'react';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="w-full px-2 py-1 bg-card border-b-2 dark:border-b-background">
            <span>
                <Image src="/logo.png" width={40} height={40} alt="Streamzio" />
            </span>
        </nav>
    );
};

export default Navbar;
