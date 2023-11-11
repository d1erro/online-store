import { ReactNode } from 'react';
import ProfileNav from '@/components/Profile/ProfileNav/ProfileNav';

const Profile = ({
    children,
    pageTitle,
    currentPage,
}: {
    children: ReactNode;
    pageTitle: string;
    currentPage: string;
}) => {
    return (
        <div className="flex flex-col mt-10">
            <h1 className="text-center text-3xl">{pageTitle}</h1>

            <div className="flex mt-10">
                <ProfileNav currentPage={currentPage} />
                <div className="flex flex-col w-full ml-10">{children}</div>
            </div>
        </div>
    );
};

export default Profile;
