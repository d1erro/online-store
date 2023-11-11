import Profile from '@/components/Profile/Profile';
import AdminPanel from '@/components/AdminPanel/AdminPanel';

const Page = () => {
    return (
        <Profile pageTitle="Админ панель" currentPage="admin">
            <AdminPanel />
        </Profile>
    );
};

export default Page;
