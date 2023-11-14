'use client';

import AddCartButton from '@/components/Product/ProductPage/CartButtons/AddCartButton';
import CartCount from '@/components/Product/ProductPage/CartButtons/CartCount';

function CartButtons({
    productId,
    productInStock,
}: {
    productId: string;
    productInStock: number;
}) {
    return (
        <div className="flex gap-8">
            <CartCount productId={productId} productInStock={productInStock} />
            <AddCartButton
                productId={productId}
                productInStock={productInStock}
            />
        </div>
    );
}

export default CartButtons;
