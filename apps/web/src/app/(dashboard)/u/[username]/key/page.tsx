import { getSelf } from '@/services/self';
import { getStreamByUserId } from '@/services/stream';
import React from 'react';
import DetailCard from './_component/detail-card';
import Generate from './_component/generate';

const STREAM_KEY = process.env.NEXT_PUBLIC_STREAM_SERVER;

const KeyPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);
    if (!stream) {
        throw new Error('No streams available');
    }
    return (
        <section className="px-6 lg:!px-10 py-6 flex flex-col gap-8">
            <div className="flex flex-col lg:!flex-row gap-8 lg:items-center">
                <h1 className="text-xl lg:text-3xl">Stream Keys and Urls</h1>
                <Generate />
            </div>
            <div className="flex flex-col gap-6">
                <DetailCard label="Stream Url" url={STREAM_KEY as string} />
                <DetailCard type="password" label="Stream Key" url={stream.streamKey} />
            </div>
        </section>
    );
};

export default KeyPage;
