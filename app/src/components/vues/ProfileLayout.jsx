import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar />
      <div className="pt-14 ml-64 w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
