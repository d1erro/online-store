'use client';

import CartItem from '@/components/Cart/CartItem';
import Cart from '@/store/Cart';
import { observer } from 'mobx-react-lite';

const CartList = observer(() => {
    const cart = Cart.cart;

    return (
        <section className="mx-auto basis-5/6 xl:mr-5 xl:basis-3/4">
            {cart.map(
                (product, index) =>
                    product.count > 0 && (
                        <CartItem key={index} product={product} />
                    ),
            )}
        </section>
    );
});

export default CartList;
