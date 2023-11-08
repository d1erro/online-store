import React, { FC } from 'react';
import ProfileMenu from '@/components/Profile/ProfileMenu/ProfileMenu';
import AddProductForm from '@/components/Admin/AddProduct/AddProductForm';

const AddProduct: FC = () => {
    return (
        <div className="flex flex-col mt-10">
            <h1 className="text-center text-3xl">Админ панель</h1>

            <div className="flex mt-10">
                <ProfileMenu currentPage="adminPanel" />
                <div className="flex flex-col w-full ml-16 items-center">
                    <AddProductForm />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
