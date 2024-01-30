import React from 'react';
import { TbLoader } from 'react-icons/tb';

const Loading = () => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <TbLoader className="w-20 h-20 text-primary animate-spin" />
        </div>
    );
};

export default Loading;
