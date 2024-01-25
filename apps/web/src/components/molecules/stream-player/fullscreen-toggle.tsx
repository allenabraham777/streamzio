import React from 'react';

import { Button } from '@streamzio/ui';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

type Props = {
    fullscreen: boolean;
    onToggle: () => void;
};

const FullscreenToggle = ({ fullscreen, onToggle }: Props) => {
    const Icon = fullscreen ? BiExitFullscreen : BiFullscreen;
    return (
        <Button variant="ghost" onClick={onToggle}>
            <Icon className="h-6 w-6" />
        </Button>
    );
};

export default FullscreenToggle;
