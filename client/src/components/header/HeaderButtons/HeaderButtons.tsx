'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import LocalMall from '@mui/icons-material/LocalMallOutlined';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const HeaderButtons = () => {
    const { data, status } = useSession();

    if (status === 'authenticated')
        return (
            <div className="flex gap-4 ml-auto items-center">
                <Link href={'/cart'}>
                    <LocalMall sx={{ color: 'white' }} fontSize="large" />
                </Link>

                <Link href={'/profile'}>
                    <AccountCircle sx={{ color: 'white' }} fontSize="large" />
                </Link>
            </div>
        );

    return (
        <div className="flex gap-4 ml-auto items-center">
            <Link href={'/cart'}>
                <LocalMall sx={{ color: 'white' }} fontSize="large" />
            </Link>

            <Link href={'/login'}>
                <LoginOutlinedIcon sx={{ color: 'white' }} fontSize="large" />
            </Link>
        </div>
    );
};

export default HeaderButtons;
