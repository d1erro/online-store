'use client';

import { observer } from 'mobx-react-lite';
import cart from '@/store/Cart';

const AddCartButton = observer(
    ({
        productId,
        productInStock,
    }: {
        productId: string;
        productInStock: number;
    }) => {
        return (
            <div>
                <button
                    onClick={() =>
                        cart.addProduct(
                            { id: productId, count: cart.count },
                            productInStock,
                        )
                    }
                    className="rounded-xl bg-black px-14 py-3 text-white"
                >
                    Добавить в корзину
                </button>
            </div>
        );
    },
);

export default AddCartButton;
