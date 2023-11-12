import { FC } from 'react';
import SignOutButton from '@/components/Profile/ProfileNav/SignOutButton';
import Link from 'next/link';

interface ProfileMenuProps {
    currentPage: string;
}

const ProfileNav: FC<ProfileMenuProps> = ({ currentPage }) => {
    return (
        <div className="flex h-[300px] w-[250px] flex-col items-center">
            <div className="flex h-[300px] w-[250px] flex-col justify-center gap-5 rounded-3xl bg-black p-5">
                <Link href="/profile" className="text-white">
                    {currentPage === 'profile' ? (
                        <p>- Профиль</p>
                    ) : (
                        <p>Профиль</p>
                    )}
                </Link>
                <Link href="/admin" className="text-white">
                    {currentPage === 'admin' ? (
                        <p>- Админ панель</p>
                    ) : (
                        <p>Админ панель</p>
                    )}
                </Link>
            </div>
            <SignOutButton />
        </div>
    );
};

export default ProfileNav;
