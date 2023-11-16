'use client';

import AddCartButton from '@/components/Product/ProductPage/CartButtons/AddCartButton';
import CartCount from '@/components/Product/ProductPage/CartButtons/CartCount';
import { IProduct } from '@/types/Product/IProduct';

function CartButtons({ product }: { product: IProduct }) {
    return (
        <div className="flex w-full flex-col justify-center gap-1 sm:flex-row lg:max-w-[450px] lg:justify-normal lg:gap-5">
            <div className="w-full sm:w-2/3">
                <CartCount product={product} />
            </div>
            <div className="w-full sm:w-3/4">
                <AddCartButton product={product} />
            </div>
        </div>
    );
}

export default CartButtons;
