import Image from 'next/image';
import { getProductById } from '@/http/products/get-product-by-id';
import { useEffect, useState } from 'react';
import { IProduct } from '@/types/Product/IProduct';
import cart from '@/store/Cart';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/material';

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
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={150}
                    sx={{
                        borderRadius: '5px',
                    }}
                />
            </div>
        );

    return (
        <div className="mb-2 border-t first:border-t last:border-b">
            <div className="flex py-7">
                <div className="rounded border p-5">
                    <Image
                        className="w-28 overflow-hidden"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${fetchProduct?.images[0]}`}
                        alt=""
                        width={400}
                        height={400}
                    />
                </div>
                <div className="mx-5 my-auto basis-2/4">
                    <h3 className="font-bold">{fetchProduct?.title}</h3>
                    <p className="text-gray-500">
                        {fetchProduct?.category.value}
                    </p>
                    <p className="text-gray-700">${fetchProduct?.price}</p>
                </div>
                <div className="my-auto">
                    <div className="flex items-center">
                        <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700"
                            onClick={() =>
                                cart.decrementProductCount(product.id)
                            }
                        >
                            -
                        </button>
                        <p className="mx-4 text-gray-700">{product.count}</p>
                        <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700"
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
                <div className="ml-auto">
                    <button
                        type="button"
                        //onClick={handleRemoveAll(product)}
                        className="flex items-start justify-end"
                    >
                        <span className="invisible">Remove</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="h-5 w-5 fill-gray-400 hover:fill-gray-500"
                        >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CartItem;
