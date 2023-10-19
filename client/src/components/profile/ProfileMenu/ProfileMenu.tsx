import React from 'react';
import SignOutButton from '@/components/profile/ProfileMenu/SignOutButton';

const ProfileMenu: React.FC = () => {
    return (
        <div className="flex flex-col items-center h-[300px] w-[250px]">
            <div className="h-[300px] w-[250px] p-5 bg-black rounded-3xl"></div>
            <SignOutButton />
        </div>
    );
};

export default ProfileMenu;
