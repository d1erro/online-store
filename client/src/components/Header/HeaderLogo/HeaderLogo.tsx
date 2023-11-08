import React from 'react';
import Link from 'next/link';

const HeaderLogo: React.FC = () => {
    return (
        <Link
            href="/"
            className={'justify-self-start font-bebasNeue text-3xl text-white'}
        >
            ONLINE STORE
        </Link>
    );
};

export default HeaderLogo;
