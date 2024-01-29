import { notFound } from 'next/navigation';
import React from 'react';

import { isFollowing } from '@/services/follow';
import { getUserByUsername } from '@/services/user';
import { isBlockedByUser } from '@/services/block';
import StreamPlayer from '@/components/molecules/stream-player';

type Props = {
    params: {
        username: string;
    };
};

const UserPage = async ({ params: { username } }: Props) => {
    const user = await getUserByUsername(username);
    if (!user || !user.stream) notFound();
    const isFollowingUser = await isFollowing(username);
    const isBlocked = await isBlockedByUser(user.id);
    if (isBlocked) notFound();
    return (
        <div className="w-full h-full">
            <StreamPlayer
                user={user}
                isHost={false}
                stream={user.stream}
                isFollowing={isFollowingUser}
            />
        </div>
    );
};

export default UserPage;
