import React from 'react';

type Props = {
    children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
    return <div className="w-full h-full flex justify-center items-center">{props.children}</div>;
};

export default AuthLayout;
