import React from 'react';
import { currentUser } from '@clerk/nextjs';

import StreamPlayer from '@/components/molecules/stream-player';
import { getUserByUsername } from '@/services/user';

type Props = {
    params: {
        username: string;
    };
};

const Dashboard = async ({ params }: Props) => {
    const externalUser = await currentUser();
    const user = await getUserByUsername(params.username);

    if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
        throw new Error('Unauthorized');
    }
    return (
        <div className="w-full h-full">
            <StreamPlayer user={user} isHost={true} stream={user.stream} isFollowing isDashboard />
        </div>
    );
};

export default Dashboard;
