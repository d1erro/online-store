'use client';

import { observer } from 'mobx-react-lite';
import cart from '@/store/CartStore';
import { IProduct } from '@/types/Product/IProduct';

const AddCartButton = observer(({ product }: { product: IProduct }) => {
    return (
        <div>
            <button
                onClick={() =>
                    cart.addProduct(
                        {
                            id: product._id,
                            price: product.price,
                            count: cart.count,
                        },
                        product.inStock,
                    )
                }
                className="h-14 w-full rounded-xl bg-black text-neutral-100"
            >
                Добавить в корзину
            </button>
        </div>
    );
});

export default AddCartButton;
