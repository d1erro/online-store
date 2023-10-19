'use client'

import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';
import UserInfo from '@/components/profile/ProfileForm/UserInfo';
import AddressInfo from '@/components/profile/ProfileForm/AddressInfo';

const ProfileForm: FC = () => {
    const { data: session, status, update } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex justify-center">
                <CircularProgress sx={{ color: 'black' }} />
            </div>
        );
    }

    if (status === 'authenticated') {
        return (
            <div className="flex gap-5 flex-col bg-gray-100 rounded-3xl p-5 ml-5">
                <UserInfo session={session} update={update} />
                <AddressInfo session={session} update={update} />
            </div>
        );
    }
};

export default ProfileForm;
