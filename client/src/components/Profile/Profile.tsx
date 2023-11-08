import React from 'react';
import ProfileMenu from '@/components/Profile/ProfileMenu/ProfileMenu';
import ProfileForm from '@/components/Profile/ProfileForm/ProfileForm';

const Profile: React.FC = () => {
    return (
        <div className="flex flex-col mt-10">
            <h1 className="text-center text-3xl">Профиль</h1>

            <div className="flex mt-10">
                <ProfileMenu currentPage="profile" />
                <div className="flex flex-col w-full">
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
};

export default Profile;
