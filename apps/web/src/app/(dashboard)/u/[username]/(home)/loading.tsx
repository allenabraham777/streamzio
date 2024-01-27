import { StreamPlayerSkeleton } from '@/components/molecules/stream-player';
import React from 'react';

const DashboardLoading = async () => {
    return (
        <div className="w-full h-full">
            <StreamPlayerSkeleton />
        </div>
    );
};

export default DashboardLoading;
