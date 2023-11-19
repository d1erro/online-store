'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IProduct } from '@/types/Product/IProduct';
import { getProductsBySearch } from '@/http/products/get-products-by-search';
import { useDebounce } from '@/hooks/useDebounce';
import { usePathname, useRouter } from 'next/navigation';

function HeaderSearch() {
    const [searchParam, setSearchParam] = useState<string>('');
    const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const debouncedSearchParam = useDebounce(searchParam, 250);

    useEffect(() => {
        if (!pathname.includes('search')) {
            setSearchParam('');
        }
    }, [pathname]);

    useEffect(() => {
        (async () => {
            if (!debouncedSearchParam) {
                setSearchProducts([]);
            }
            if (debouncedSearchParam) {
                const products =
                    await getProductsBySearch(debouncedSearchParam);
                if (products && products.length > 0) {
                    setSearchProducts(products);
                }
            }
        })();
    }, [debouncedSearchParam]);

    const inputChangeHandler = (e: any) => {
        if (e?.target.value) {
            setSearchParam(e.target.value);
        }
        if (e?.target.nodeName === 'LI') {
            router.push(`/products/search/${e.target.innerText}`);
        }
    };

    const onSubmitHandler = (e: any) => {
        if (e?.target.value) {
            setSearchParam(e.target.value);
        }
    };

    return (
        <div className="mx-5 hidden flex-grow items-center justify-center md:flex">
            <Autocomplete
                fullWidth
                size="small"
                freeSolo
                id="search"
                value={searchParam}
                options={searchProducts.map((product) => product.title)}
                onInputChange={inputChangeHandler}
                onSubmit={onSubmitHandler}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className="rounded bg-neutral-50 dark:bg-neutral-800"
                        placeholder="Поиск"
                        InputProps={{
                            ...params.InputProps,
                        }}
                    />
                )}
            />
        </div>
    );
}

export default HeaderSearch;
