import { notFound } from 'next/navigation';
import React from 'react';

import Actions from '@/components/molecules/users/actions';
import { isFollowing } from '@/services/follow';
import { getUserByUsername } from '@/services/user';

type Props = {
    params: {
        username: string;
    };
};

const UserPage = async ({ params: { username } }: Props) => {
    const user = await getUserByUsername(username);
    if (!user) notFound();
    const isFollowingUser = await isFollowing(username);
    return (
        <div>
            <Actions userId={user.id} isFollowing={isFollowingUser} />
        </div>
    );
};

export default UserPage;
