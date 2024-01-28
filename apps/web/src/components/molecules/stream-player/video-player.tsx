'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useEventListener, useIsClient } from 'usehooks-ts';

import { Stream } from '@streamzio/db';

import { FullUser } from '@/types';

import VolumeRocker from './volume-rocker';
import PlayButton from './play-button';
import FullscreenToggle from './fullscreen-toggle';

type Props = {
    stream: Stream;
    user: FullUser;
    muted?: boolean;
};

const VideoPlayer = ({ user, stream, muted = false }: Props) => {
    const [fullscreen, setFullscreen] = useState(false);
    const [mute, setMute] = useState(muted);
    const [volume, setVolume] = useState(100);
    const [play, setPlay] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const isClient = useIsClient();

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setFullscreen(isCurrentlyFullscreen);
    };

    useEventListener('fullscreenchange', handleFullscreenChange, divRef);

    useEffect(() => {
        const loadPlayer = async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
        loadPlayer();
        if (isClient) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let flv: any;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            import('flv.js').then((flvjs: any) => {
                if (flvjs.isSupported() && videoRef.current) {
                    const flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: `${process.env.NEXT_PUBLIC_VIEW_SERVER}/${stream.streamKey}.flv`
                        // url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
                    });
                    flvPlayer.attachMediaElement(videoRef.current);
                    flvPlayer.load();
                    flvPlayer.play();
                    flv = flvPlayer;
                    videoRef.current.onplay = () => {
                        setPlay(true);
                    };
                }
            });
            return () => {
                flv?.destroy();
            };
        }
    }, [stream, isClient, user.username]);

    const playPause = () => {
        if (play) {
            setPlay(false);
            videoRef.current?.pause();
        } else {
            setPlay(true);
            videoRef.current?.play();
        }
    };

    const onVolumeChange = ([value]: number[]) => {
        if (!videoRef.current) return;
        setVolume(value);
        setMute(false);
        videoRef.current.volume = 0.01 * value;
    };

    const toggleFullscreen = () => {
        if (fullscreen) {
            document.exitFullscreen();
        } else if (divRef?.current) {
            divRef.current.requestFullscreen();
        }
    };

    return (
        <div className="w-full h-full relative" ref={divRef}>
            <video
                className="h-full w-full cursor-pointer"
                ref={videoRef}
                muted={mute}
                onClick={playPause}
                poster={stream.thumbnailUrl || ''}
            />
            <div className="absolute bg-gradient-to-b from-transparent to-background p-4 w-full bottom-0 z-10 flex items-center gap-2">
                <PlayButton play={play} onToggle={playPause} />
                <VolumeRocker
                    mute={mute}
                    volume={volume}
                    toggleMute={() => setMute((mute) => !mute)}
                    onChange={onVolumeChange}
                />
                <div className="flex-1" />
                <FullscreenToggle fullscreen={fullscreen} onToggle={toggleFullscreen} />
            </div>
        </div>
    );
};

export default VideoPlayer;
