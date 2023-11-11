import Profile from '@/components/Profile/Profile';
import ProfileData from '@/components/Profile/ProfileData/ProfileData';

const Page = () => {
    return (
        <Profile pageTitle="Личная информация" currentPage="profile">
            <ProfileData />
        </Profile>
    );
};

export default Page;
