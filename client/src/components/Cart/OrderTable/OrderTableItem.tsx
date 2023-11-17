import { useEffect, useState } from 'react';
import { getProductById } from '@/http/products/get-product-by-id';
import { IProductCartInCart } from '@/store/CartStore';
import { IProduct } from '@/types/Product/IProduct';
import { formatPrice } from '@/utils/format-price';
import { price } from '@/utils/price';

function OrderTableItem({ product }: { product: IProductCartInCart }) {
    const [fetchProduct, setFetchProduct] = useState<IProduct>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductById(product.id)
            .then((res) => {
                setFetchProduct(res);
            })
            .then(() => {
                setLoading(false);
            });
    }, [product.id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-between gap-3 border-b py-3">
            <p className="basis-3/4">{fetchProduct?.title}</p>
            <p className="basis-1/4 text-end font-bold">
                {formatPrice.format(price(product.price, product.count))}
            </p>
        </div>
    );
}

export default OrderTableItem;
