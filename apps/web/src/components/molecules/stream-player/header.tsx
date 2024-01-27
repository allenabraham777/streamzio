'use client';
import React, { useContext, useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';

import { Stream } from '@streamzio/db';

import { FullUser } from '@/types';
import UserAvatar from '@/components/molecules/users/user-avatar';
import Actions from '../users/actions';
import socketContext from '@/context/socket-context';
import { cn } from '@streamzio/ui';

type Props = {
    user: FullUser;
    stream: Stream;
    isHost: boolean;
    isFollowing: boolean;
};

type Member = { username: string; userId: string; socketId: string };

const Header = ({ user, stream, isHost, isFollowing }: Props) => {
    const [members, setMembers] = useState<Member[]>([]);
    const { socket } = useContext(socketContext);
    useEffect(() => {
        const loadList = (members: Member[]) => {
            setMembers(members);
        };

        const addMember = (member: Member) => {
            setMembers([...members, member]);
        };

        const removeMember = (id: string) => {
            setMembers(members.filter((member) => member.userId !== id));
        };
        if (socket && stream.isLive) {
            socket.emit('stream:user:all', stream.id);
            socket.on('stream:user:list', loadList);
            socket.on('stream:user:joined', addMember);
            socket.on('stream:user:left', removeMember);

            return () => {
                socket?.off('stream:user:list', loadList);
                socket?.off('stream:user:joined', addMember);
                socket?.off('stream:user:left', removeMember);
                setMembers([]);
            };
        }
    }, [stream.isLive, socket]);
    const viewerCount = members.length ? members.length - 1 : 0;
    return (
        <div className="w-full p-6">
            <div className="flex gap-4">
                <div className="flex items-start">
                    <div
                        className={cn({
                            'rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background':
                                stream.isLive
                        })}
                    >
                        <UserAvatar user={user} isLive={stream.isLive} showBadge variant="lg" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-0">
                    <div className="flex gap-2 items-center">
                        <h3 className="text-sm font-bold">{user.username}</h3>
                        <FaCircleCheck className="text-primary h-4 w-4" />
                    </div>
                    <div>
                        <h4 className="text-lg">{stream.name}</h4>
                    </div>
                    {!stream.isLive && (
                        <div>
                            <h4 className="text-white/40 text-xs">Offline</h4>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Actions isFollowing={isFollowing} userId={user.id} disabled={isHost} />
                    <div className={cn('flex justify-between', { hidden: !stream.isLive })}>
                        <h4 className="flex gap-2 items-center text-red-400">
                            <FiUser className="w-5 h-5 text-red-400" />
                            <span>{viewerCount}</span>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
