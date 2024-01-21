'use client';
import React from 'react';

import { Badge } from '@streamzio/ui';

type Props = {
    isSmall?: boolean;
};

const LiveBadge = ({ isSmall }: Props) => {
    if (isSmall) return <span className="block w-2 h-2 rounded-full bg-red-600"></span>;
    return <Badge className="rounded-sm bg-red-600">LIVE</Badge>;
};

export default LiveBadge;
