import { FC } from 'react';
import Profile from '@/components/Profile/Profile';
import AddProduct from '@/components/AdminPanel/AddProduct/AddProduct';

const Page: FC = () => {
    return (
        <Profile pageTitle="Добавление товара" currentPage={'admin'}>
            <AddProduct />
        </Profile>
    );
};

export default Page;
