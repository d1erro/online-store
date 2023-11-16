'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Loader from '@/ui/Loader/Loader';
import CartStore from '@/store/CartStore';
import CartList from '@/components/Cart/CartList';
import OrderTable from '@/components/Cart/OrderTable/OrderTable';

const Cart = observer(() => {
    const [loading, setLoading] = useState(true);
    const cart = CartStore.cart;

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <Loader />;

    if (cart.length === 0)
        return (
            <div className="mt-5 flex justify-center">
                <h2 className="text-xl">Корзина пуста</h2>
            </div>
        );

    return (
        <div className="mt-5 flex flex-col xl:flex-row">
            <CartList cart={cart} />
            <OrderTable cart={cart} />
        </div>
    );
});

export default Cart;
