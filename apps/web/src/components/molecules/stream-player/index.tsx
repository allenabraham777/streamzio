import React from 'react';

import { Stream } from '@streamzio/db';

import { FullUser } from '@/types';
import Video from './video';

type Props = {
    user: FullUser;
    stream: Stream;
    isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
    return (
        <div className="h-full w-full">
            <Video user={user} stream={stream} />
        </div>
    );
};

export default StreamPlayer;
