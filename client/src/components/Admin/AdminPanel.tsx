import React, { FC } from 'react';
import ProfileMenu from '@/components/Profile/ProfileMenu/ProfileMenu';
import AdminButtons from '@/components/Admin/AdminButtons';
import Link from 'next/link';
import { Button } from '@mui/material';

const AdminPanel: FC = () => {
    return (
        <div className="flex flex-col mt-10">
            <h1 className="text-center text-3xl">Админ панель</h1>

            <div className="flex mt-10">
                <ProfileMenu currentPage="adminPanel" />
                <div className="flex flex-col w-full">
                    <Link className="ml-5" href="/admin/product/add">
                        <Button>Добавить товар</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
