'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

const SignOutButton = () => {
    return (
        <Link
            href="/"
            className="mt-5 w-[250px] w-full text-white bg-black rounded-3xl p-5 text-center hover:bg-gray-800"
            onClick={() => signOut({ callbackUrl: '/' })}
        >
            Выйти из аккаунта
        </Link>
    );
};

export default SignOutButton;
