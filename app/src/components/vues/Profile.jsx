import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

const Profile = () => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile</h3>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>First Name:</strong> {userInfo.first_name}</p>
      <p><strong>Last Name:</strong> {userInfo.last_name}</p>
      <p><strong>Phone Number:</strong> {userInfo.phone_number}</p>
    </div>
  );
};

export default Profile;
