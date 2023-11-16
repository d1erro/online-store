import Image from 'next/image';
import { getProductById } from '@/http/products/get-product-by-id';
import { useEffect, useState } from 'react';
import { IProduct } from '@/types/Product/IProduct';
import cart from '@/store/CartStore';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/material';
import { formatPrice } from '@/utils/format-price';
import CloseIcon from '@mui/icons-material/Close';

const CartItem = observer(({ product }: { product: any }) => {
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

    if (loading)
        return (
            <div className="my-10 flex flex-col gap-5">
                <Skeleton variant="rectangular" animation="wave" height={150} />
            </div>
        );

    return (
        <div className="mb-5 rounded border border-neutral-500 p-5">
            <div className="flex w-full flex-col items-center md:flex-row md:items-start">
                <Image
                    className="w-28 overflow-hidden"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${fetchProduct?.images[0]}`}
                    alt=""
                    width={500}
                    height={500}
                />

                <div className="ml-5 flex w-full flex-col items-center md:flex-row md:justify-center">
                    <div className="mt-5 flex w-full flex-col items-center justify-center md:mt-0 md:items-start">
                        <h3 className="text-center font-bold md:text-start">
                            {fetchProduct?.title}
                        </h3>
                        <p>{fetchProduct?.category.value}</p>
                        <p>{formatPrice.format(product.price)}</p>
                    </div>

                    <div className="mx-5 my-3 flex justify-end md:my-auto">
                        <div className="flex items-center">
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-neutral-700"
                                onClick={() =>
                                    cart.decrementProductCount(product.id)
                                }
                            >
                                -
                            </button>
                            <p className="mx-4">{product.count}</p>
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-neutral-700"
                                onClick={() =>
                                    cart.incrementProductCount(
                                        product.id,
                                        fetchProduct!.inStock,
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => cart.removeProduct(product.id)}
                    className="absolute right-[50px] md:static md:right-0 md:flex md:items-start md:justify-end"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
});

export default CartItem;
