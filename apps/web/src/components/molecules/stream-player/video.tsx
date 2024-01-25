import React from 'react';

import { Stream } from '@streamzio/db';

import { FullUser } from '@/types';
import { LuWifiOff } from 'react-icons/lu';
import VideoPlayer from './video-player';

type Props = {
    user: FullUser;
    stream: Stream;
};

const Offline = ({ user }: Props) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-6">
            <LuWifiOff className="w-32 h-32" />
            <h3 className="text-2xl">{user.username} is offline</h3>
        </div>
    );
};

const Video = ({ user, stream }: Props) => {
    let component;
    if (!stream.isLive) {
        component = <Offline stream={stream} user={user} />;
    } else {
        component = <VideoPlayer user={user} stream={stream} />;
    }
    return <div className="aspect-video border-b">{component}</div>;
};

export default Video;
