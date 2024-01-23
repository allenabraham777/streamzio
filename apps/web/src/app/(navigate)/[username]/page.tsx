import { notFound } from 'next/navigation';
import React from 'react';

import Actions from '@/components/molecules/users/actions';
import { isFollowing } from '@/services/follow';
import { getUserByUsername } from '@/services/user';
import { isBlockedByUser } from '@/services/block';

type Props = {
    params: {
        username: string;
    };
};

const UserPage = async ({ params: { username } }: Props) => {
    const user = await getUserByUsername(username);
    if (!user) notFound();
    const isFollowingUser = await isFollowing(username);
    const isBlocked = await isBlockedByUser(user.id);
    if (isBlocked) notFound();
    return (
        <div>
            <Actions userId={user.id} isFollowing={isFollowingUser} />
        </div>
    );
};

export default UserPage;
