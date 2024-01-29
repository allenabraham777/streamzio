import React from 'react';

import { StreamPlayerSkeleton } from '@/components/molecules/stream-player';

const UserpageLoading = () => {
    return (
        <div className="w-full h-full">
            <StreamPlayerSkeleton />
        </div>
    );
};

export default UserpageLoading;
