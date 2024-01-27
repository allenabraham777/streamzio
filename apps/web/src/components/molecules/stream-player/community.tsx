import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Stream } from '@streamzio/db';
import { Input } from '@streamzio/ui';

import socketContext from '@/context/socket-context';

type Props = {
    stream: Stream;
};

type Member = { username: string; userId: string; socketId: string };

const Community = ({ stream }: Props) => {
    const { socket } = useContext(socketContext);
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(() => {
        if (socket) {
            socket.emit('stream:user:all', stream.id);
            socket.on('stream:user:list', (members: Member[]) => {
                setMembers(members);
            });
            socket.on('stream:user:joined', (member: Member) => {
                setMembers([...members, member]);
            });
            socket.on('stream:user:left', (id: string) => {
                setMembers(members.filter((member) => member.userId !== id));
            });
        }
    }, [socket]);
    return (
        <div className="flex-1 flex flex-col">
            <div className="border-b border-hover px-4 py-6">
                <div className="relative">
                    <Input className="!pl-10" placeholder="Filter" />
                    <FaSearch className="w-4 h-4 absolute left-3 top-3" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">{members.map((member) => member.username)}</div>
        </div>
    );
};

export default Community;
