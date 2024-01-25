'use client';
import React, { useEffect, useRef, useState } from 'react';
import flvjs from 'flv.js';
import { useEventListener, useIsClient } from 'usehooks-ts';

import { Stream } from '@streamzio/db';
import { revalidatePath } from 'next/cache';

import { FullUser } from '@/types';

import VolumeRocker from './volume-rocker';
import PlayButton from './play-button';
import FullscreenToggle from './fullscreen-toggle';

type Props = {
    stream: Stream;
    user: FullUser;
};

const VideoPlayer = ({ user, stream }: Props) => {
    const [fullscreen, setFullscreen] = useState(false);
    const [mute, setMute] = useState(false);
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
        if (flvjs.isSupported() && videoRef.current) {
            const flvPlayer = flvjs.createPlayer({
                type: 'mp4',
                url: `${process.env.NEXT_PUBLIC_VIEW_SERVER}/${stream.streamKey}.flv`
                // url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
            });
            flvPlayer.attachMediaElement(videoRef.current);
            flvPlayer.load();
            flvPlayer.play();
            videoRef.current.onplay = () => {
                setPlay(true);
            };
            videoRef.current.onclose = () => {
                setTimeout(() => {
                    revalidatePath(`/u/${user.username}`);
                    revalidatePath(`/${user.username}`);
                }, 10000);
            };
            return () => {
                flvPlayer.destroy();
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
