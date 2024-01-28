import React from 'react';
import ToggleCard from './_component/toggle-card';
import { getSelf } from '@/services/self';
import { getStreamByUserId } from '@/services/stream';

const Chat = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);
    if (!stream) {
        throw new Error('Stream not found');
    }
    return (
        <section className="px-6 lg:!px-10 py-6 flex flex-col gap-4 lg:!gap-8">
            <h1 className="text-xl lg:text-3xl">Chat Settings</h1>
            <div className="flex flex-col gap-4 lg:!gap-6">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard field="isChatDelayed" label="Delay chat" value={stream.isChatDelayed} />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Must be following to chat"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </section>
    );
};

export default Chat;
