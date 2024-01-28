import React from 'react';
import { notFound } from 'next/navigation';

import Navbar from './_component/navbar';
import Sidebar from './_component/sidebar';
import { getSelfByUsername } from '@/services/self';

type Props = {
    children: React.ReactNode;
    params: {
        username: string;
    };
};

const DashboardLayout = async ({ children, params }: Props) => {
    const user = await getSelfByUsername(params.username);
    if (!user) notFound();
    return (
        <div className="flex flex-col h-full max-h-full">
            <Navbar />
            <section className="flex-1 flex overflow-y-auto">
                <Sidebar user={user} />
                <div className="flex-1 max-h-full overflow-y-auto">{children}</div>
            </section>
        </div>
    );
};

export default DashboardLayout;
