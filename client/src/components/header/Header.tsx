import React from 'react';
import HeaderButtons from '@/components/Header/HeaderButtons/HeaderButtons';
import HeaderLogo from '@/components/Header/HeaderLogo/HeaderLogo';
import HeaderSearch from '@/components/Header/HeaderSearch/HeaderSearch';

const categories = [
    'КОРПУСА',
    'ПРОЦЕССОРЫ',
    'ВИДЕОКАРТЫ',
    'МАТЕРИНСКИЕ ПЛАТЫ',
    'ОПЕРАТИВНАЯ ПАМЯТЬ',
    'НАКОПИТЕЛИ',
];

const Header: React.FC = () => {
    return (
        <header className="bg-black">
            <div className="container flex items-center h-[65px]">
                <HeaderLogo />
                <HeaderSearch />
                <HeaderButtons />
            </div>

            <div className="bg-white h-[3px] w-full"></div>

            <div className="container flex justify-between items-center bg-black h-[65px] w-full text-white">
                {categories.map((category, index) => (
                    <p key={index}>{category}</p>
                ))}
            </div>
        </header>
    );
};

export default Header;
