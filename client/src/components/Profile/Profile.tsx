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
        <div className="mt-10 flex flex-col">
            <h1 className="text-center text-3xl">{pageTitle}</h1>

            <div className="mt-10 flex">
                <ProfileNav currentPage={currentPage} />
                <div className="ml-10 flex w-full flex-col">{children}</div>
            </div>
        </div>
    );
};

export default Profile;
