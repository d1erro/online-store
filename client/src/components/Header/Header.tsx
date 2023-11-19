import HeaderButtons from '@/components/Header/HeaderButtons/HeaderButtons';
import HeaderLogo from '@/components/Header/HeaderLogo/HeaderLogo';
import HeaderSearch from '@/components/Header/HeaderSearch/HeaderSearch';
import getCategories from '@/http/categories/get-categories';
import Link from 'next/link';
import HeaderMobileButton from '@/components/Header/HeaderMobileButton/HeaderMobileButton';

export interface ICategory {
    _id: string;
    title: string;
    value: string;
}

async function Header() {
    const categories = await getCategories();
    return (
        <header className="bg-black">
            <div className="container flex h-[65px] items-center">
                <HeaderLogo />
                <HeaderSearch />
                <HeaderButtons />
                <HeaderMobileButton />
            </div>

            <div className="hidden h-[3px] w-full bg-neutral-50 dark:bg-neutral-800 lg:block"></div>

            <div className="container hidden h-[65px] w-full items-center justify-between bg-black text-white lg:flex">
                {categories.map((category: ICategory) => (
                    <Link
                        href={`/category/${category.title}`}
                        key={category._id}
                    >
                        {category.value.toUpperCase()}
                    </Link>
                ))}
            </div>
        </header>
    );
}

export default Header;
