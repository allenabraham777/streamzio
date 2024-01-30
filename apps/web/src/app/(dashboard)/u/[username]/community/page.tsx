import { getBlockedChannels } from '@/services/community';
import React from 'react';
import BlockedUsers from './_component/blocked-users';

const CommunityPage = async () => {
    const blockedUsers = await getBlockedChannels();
    return (
        <main className="max-2xl h-full p-10 flex flex-col gap-4">
            <h1 className="text-xl">Blocked Users</h1>
            <BlockedUsers data={blockedUsers} />
        </main>
    );
};

export default CommunityPage;
