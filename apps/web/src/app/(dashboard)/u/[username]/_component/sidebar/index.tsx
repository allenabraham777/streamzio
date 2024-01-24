import React from 'react';

import { User } from '@streamzio/db';

import CollapsibleButton from './collapsible-button';
import SidebarWrapper from './sidebar-wrapper';
import Navigation from './navigation';

type Props = {
    user: User;
};

const Sidebar = ({ user }: Props) => {
    return (
        <SidebarWrapper>
            <CollapsibleButton>CREATOR DASHBOARD</CollapsibleButton>
            <Navigation user={user} />
        </SidebarWrapper>
    );
};

export default Sidebar;
