'use client';
import React from 'react';
import ColorHash from 'color-hash';
import { ImBlocked } from 'react-icons/im';

import { Button } from '@streamzio/ui';

const colorHash = new ColorHash();

type Props = {
    userId: string;
    socketId: string;
    username: string;
    disabled: boolean;
    isActionAllowed: boolean;
    blockUser: (userId: string, socketId: string) => void;
};

const MemberCard = ({
    username,
    isActionAllowed,
    userId,
    socketId,
    disabled,
    blockUser
}: Props) => {
    const color = colorHash.hex(username);
    return (
        <div className="grid grid-cols-3 items-center hover:bg-muted px-4 py-2 rounded-lg">
            <div className="col-span-2 py-2" style={{ color }}>
                {username}
            </div>
            {isActionAllowed && (
                <div className="col-span-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => blockUser(userId, socketId)}
                    >
                        <ImBlocked className="text-foreground/40 h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MemberCard;
