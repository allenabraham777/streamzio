'use client';
import React from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';

import { Button } from '@streamzio/ui';

type Props = {
    play: boolean;
    onToggle: () => void;
};

const PlayButton = ({ play, onToggle }: Props) => {
    return (
        <Button variant="ghost" onClick={onToggle}>
            {play ? <BiPause className="h-10 w-10" /> : <BiPlay className="h-10 w-10" />}
        </Button>
    );
};

export default PlayButton;
