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

function Header() {
    return (
        <header className="bg-black">
            <div className="container flex h-[65px] items-center">
                <HeaderLogo />
                <HeaderSearch />
                <HeaderButtons />
            </div>

            <div className="h-[3px] w-full bg-white"></div>

            <div className="container hidden h-[65px] w-full items-center justify-between bg-black text-white lg:flex">
                {categories.map((category, index) => (
                    <p key={index}>{category}</p>
                ))}
            </div>
        </header>
    );
}

export default Header;
