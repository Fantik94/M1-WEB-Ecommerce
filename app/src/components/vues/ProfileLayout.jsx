import React from 'react';
import Sidebar from './Sidebar';

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar />
      <div className="pt-20 ml-64 w-full">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
