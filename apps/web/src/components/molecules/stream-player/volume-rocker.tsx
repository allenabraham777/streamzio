'use client';
import React from 'react';
import { LuVolume, LuVolume1, LuVolume2, LuVolumeX } from 'react-icons/lu';

import { Slider } from '@streamzio/ui';

type Props = {
    mute: boolean;
    volume: number;
    onChange: (value: number[]) => void;
    toggleMute: () => void;
};

const VolumeRocker = ({ mute, volume, onChange, toggleMute }: Props) => {
    let Icon;
    if (mute) {
        Icon = LuVolumeX;
    } else if (volume === 0) {
        Icon = LuVolume;
    } else if (volume < 50) {
        Icon = LuVolume1;
    } else {
        Icon = LuVolume2;
    }
    return (
        <div className="w-32 flex gap-2">
            <Icon className="h-6 w-6 cursor-pointer" onClick={toggleMute} />
            <Slider
                value={[mute ? 0 : volume]}
                onValueChange={onChange}
                min={0}
                max={100}
                step={1}
                className="cursor-pointer"
            />
        </div>
    );
};

export default VolumeRocker;
