import React, { Suspense } from 'react';
import Navbar from './_component/navbar';
import Sidebar, { SidebarSkeleton } from './_component/sidebar';

type Props = {
    children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <section className="flex h-full">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <div className="flex-1">{children}</div>
            </section>
        </div>
    );
};

export default HomeLayout;
