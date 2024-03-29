'use client';
import { VariantProps, cva } from 'class-variance-authority';

import { User } from '@streamzio/db';
import { Avatar, AvatarFallback, AvatarImage, cn } from '@streamzio/ui';
import LiveBadge from './live-badge';

const variants = cva('', {
    variants: {
        variant: {
            default: 'w-10 h-10',
            sm: 'w-8 h-8',
            md: 'w-14 h-14',
            lg: 'w-16 h-16'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

export interface Props extends VariantProps<typeof variants> {
    isLive?: boolean;
    user: User;
    showBadge?: boolean;
}

const UserAvatar = ({ variant, user, showBadge, isLive }: Props) => {
    return (
        <div className="relative">
            <Avatar className={cn(variants({ variant }))}>
                <AvatarImage src={user.imageUrl} className={cn({ grayscale: !isLive })} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            {showBadge && isLive && (
                <span className="absolute text-sm px-1 -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </span>
            )}
        </div>
    );
};

export default UserAvatar;
