'use client';

import { observer } from 'mobx-react-lite';
import cart from '@/store/CartStore';
import { IProduct } from '@/types/Product/IProduct';

const CartCount = observer(({ product }: { product: IProduct }) => {
    return (
        <div className="flex h-14 w-full rounded-xl border-2 border-black bg-black">
            <button
                onClick={() => cart.decrementGlobalCount()}
                className="flex-1 text-white"
            >
                -
            </button>
            <div className="flex h-[50px] w-[50px] flex-1 items-center justify-center border-x-2">
                <p className="text-white">{cart.count}</p>
            </div>
            <button
                onClick={() =>
                    cart.incrementGlobalCount(product._id, product.inStock)
                }
                className="flex-1 text-white"
            >
                +
            </button>
        </div>
    );
});

export default CartCount;
