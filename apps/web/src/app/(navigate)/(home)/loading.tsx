import React from 'react';

import StreamsSkeleton from './_component/streams/streams-skeleton';

const Loading = () => {
    return (
        <main className="max-2xl h-full p-10">
            <StreamsSkeleton />
        </main>
    );
};

export default Loading;
