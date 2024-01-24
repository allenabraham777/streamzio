'use client';
import React, { useMemo } from 'react';
import { RiHome5Line } from 'react-icons/ri';
import { BsBroadcast } from 'react-icons/bs';
import { FiMessageSquare } from 'react-icons/fi';
import { LuKeyRound } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import { User } from '@streamzio/db';

import ActionCard from './action-card';

type Props = {
    user: User;
};

const Navigation = ({ user }: Props) => {
    const pathname = usePathname();
    const links = useMemo(
        () => [
            {
                icon: RiHome5Line,
                link: `/`,
                text: 'Home'
            },
            {
                icon: BsBroadcast,
                link: `/u/${user.username}`,
                text: 'Stream Manager'
            },
            {
                icon: LuKeyRound,
                link: `/u/${user.username}/key`,
                text: 'Stream Keys'
            },
            {
                icon: FiMessageSquare,
                link: `/u/${user.username}/chat`,
                text: 'Chat'
            },
            {
                icon: FaUsers,
                link: `/u/${user.username}/community`,
                text: 'Community'
            }
        ],
        [user]
    );
    return (
        <div className="flex flex-col gap-2">
            {links.map((link) => (
                <ActionCard
                    key={link.text}
                    icon={link.icon}
                    link={link.link}
                    text={link.text}
                    isActive={pathname === link.link}
                />
            ))}
        </div>
    );
};

export default Navigation;
