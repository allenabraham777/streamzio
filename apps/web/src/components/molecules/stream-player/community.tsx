'use client';
import React, { useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { FaCheckCircle, FaSearch } from 'react-icons/fa';
import { toast } from 'sonner';
import { IoCloseCircle } from 'react-icons/io5';

import { Stream, User } from '@streamzio/db';
import { Input } from '@streamzio/ui';

import socketContext from '@/context/socket-context';
import { FullUser } from '@/types';
import MemberCard from './member-card';
import { onBlock } from '@/actions/block';

type Props = {
    user: FullUser;
    stream: Stream;
    isHost: boolean;
};

type Member = { username: string; userId: string; socketId: string };

const Community = ({ stream, user, isHost }: Props) => {
    const { socket } = useContext(socketContext);
    const [members, setMembers] = useState<Member[]>([]);
    const [filter, setFilter] = useState('');
    const [isPending, startTransition] = useTransition();

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
    }, [socket, stream.isLive]);
    const blockUser = (userId: string, socketId: string) => {
        startTransition(() => {
            onBlock(userId)
                .then((data: { blocked: User }) => {
                    socket?.emit('stream:user:block', stream.id, socketId);
                    toast.success('Blocked', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `You have now blocked ${data.blocked.username}`
                    });
                })
                .catch(() => {
                    toast.error('Error', {
                        position: 'top-center',
                        icon: <IoCloseCircle className="w-4 h-4 text-red-600" />,
                        description: 'Something went wrong!'
                    });
                });
        });
    };
    const filteredList = useMemo(() => {
        if (!filter) return members;
        return members.filter((member) => member.username.includes(filter));
    }, [filter, members]);
    return (
        <div className="flex-1 flex flex-col">
            <div className="border-b border-hover px-4 py-6">
                <div className="relative">
                    <Input
                        className="!pl-10"
                        placeholder="Filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <FaSearch className="w-4 h-4 absolute left-3 top-3" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                <h1 className="text-base font-bold">Members</h1>
                {filteredList.length === 0 && (
                    <h1 className="text-sm py-24 text-center">No members</h1>
                )}
                {filteredList.map((member) => (
                    <MemberCard
                        key={member.userId}
                        userId={member.userId}
                        socketId={member.socketId}
                        username={member.username}
                        isActionAllowed={isHost && user.id !== member.userId}
                        blockUser={blockUser}
                        disabled={isPending}
                    />
                ))}
            </div>
        </div>
    );
};

export default Community;
