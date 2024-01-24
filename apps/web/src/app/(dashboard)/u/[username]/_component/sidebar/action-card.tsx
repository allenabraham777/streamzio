'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { IconType } from 'react-icons';

import { cn } from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';

type Props = {
    icon: IconType;
    text: string;
    link: string;
    isActive: boolean;
};

const ActionCard = ({ icon: Icon, text, link, isActive }: Props) => {
    const collapsed = useRecoilValue(collapsibleStateSelector);
    return (
        <Link
            href={link}
            className={cn('flex items-center gap-4 justify-center p-1 rounded-md', {
                'justify-center': collapsed,
                'lg:!justify-start lg:px-4': !collapsed,
                'bg-primary': isActive
            })}
        >
            <Icon className="w-6 h-8" />
            <h1
                className={cn('p-0 text-base truncate hidden', {
                    hidden: collapsed,
                    'lg:block': !collapsed
                })}
            >
                {text}
            </h1>
        </Link>
    );
};

export default ActionCard;
