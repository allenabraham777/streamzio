import React from 'react';

import { StreamPlayerSkeleton } from '@/components/molecules/stream-player';

const DashboardLoading = async () => {
    return (
        <div className="w-full h-full">
            <StreamPlayerSkeleton />
        </div>
    );
};

export default DashboardLoading;
