'use client';
import React from 'react';

import { Block, User } from '@streamzio/db';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@streamzio/ui';
import UserAvatar from '@/components/molecules/users/user-avatar';
import UnblockButton from './unblock-button';

type Props = {
    data: (Block & { blocked: User })[];
};

const BlockedUsers = ({ data }: Props) => {
    if (!data.length)
        return (
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-xl text-foreground/60">No blocked users</h1>
            </div>
        );
    return (
        <div className="flex flex-col gap-2">
            <div></div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((block) => (
                            <TableRow key={block.id}>
                                <TableCell className="font-semibold text-lg flex gap-4 items-center">
                                    <UserAvatar user={block.blocked} /> {block.blocked.username}
                                </TableCell>
                                <TableCell>
                                    <UnblockButton userId={block.blocked.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BlockedUsers;
