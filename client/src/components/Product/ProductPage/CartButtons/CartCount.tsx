'use client';

import { observer } from 'mobx-react-lite';
import cart from '@/store/Cart';

const CartCount = observer(
    ({
        productId,
        productInStock,
    }: {
        productId: string;
        productInStock: number;
    }) => {
        return (
            <div className="flex w-[200px] rounded-xl border-2 border-black bg-black">
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
                        cart.incrementGlobalCount(productId, productInStock)
                    }
                    className="flex-1 text-white"
                >
                    +
                </button>
            </div>
        );
    },
);

export default CartCount;
