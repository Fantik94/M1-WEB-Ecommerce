import React from 'react';

const Profil = () => {
    return (
        <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="flex items-center mb-4">
                    <img className="w-12 h-12 rounded-full mr-4" src="profile.jpg" alt="Profile" />
                    <div>
                        <h2 className="text-lg font-bold">John Doe</h2>
                        <p className="text-gray-500">Software Engineer</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">About Me</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2">Contact</h3>
                    <p>Email: john.doe@example.com</p>
                    <p>Phone: +1 123 456 7890</p>
                </div>
            </div>
        </div>
    );
};

export default Profil;