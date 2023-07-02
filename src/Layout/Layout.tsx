import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto my-5 mt-12 p-5">
            <Outlet/>
        </div>
    );
};

export default Layout;