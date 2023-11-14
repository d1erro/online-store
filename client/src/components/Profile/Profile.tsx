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
                <div className="flex w-full flex-col md:ml-10 md:w-[80%]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Profile;
