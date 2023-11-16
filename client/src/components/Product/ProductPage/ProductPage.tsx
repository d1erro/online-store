import { getProductById } from '@/http/products/get-product-by-id';
import { IProduct } from '@/types/Product/IProduct';
import ImageSlider from '@/components/Product/ProductPage/ImagesSwiper';
import { formatPrice } from '@/utils/format-price';
import CartButtons from '@/components/Product/ProductPage/CartButtons/CartButtons';

async function ProductPage({ productId }: { productId: string }) {
    const product: IProduct = await getProductById(productId);
    return (
        <section className="mt-5 flex flex-col">
            <h2 className="mb-10 mt-10 text-center text-2xl lg:text-3xl">
                {product.title}
            </h2>

            <div className="flex flex-col justify-center lg:flex-row">
                <div className="lg:w-[40%]">
                    <ImageSlider images={product.images} />
                </div>

                <div className="flex flex-col items-center lg:ml-[5%] lg:w-[55%] lg:items-start">
                    <div className="my-5 max-w-max bg-black px-5 py-2 text-white lg:mt-0">
                        <span>Категория: {product.category.value}</span>
                    </div>

                    <p className="mb-8 text-center lg:text-start">{`${product.description}`}</p>

                    <div className="mb-5 flex w-full flex-col items-center justify-center gap-1 sm:mb-10 sm:flex-row lg:max-w-[450px] lg:justify-normal lg:gap-5">
                        <div className="flex h-14 w-full items-center justify-center rounded-xl bg-black text-3xl text-white sm:w-2/3">
                            <span>{formatPrice.format(product.price)}</span>
                        </div>

                        <div className="flex h-14 w-full items-center justify-center rounded-xl bg-black text-white sm:w-1/3">
                            <span>В наличии: {product.inStock}</span>
                        </div>
                    </div>

                    <div className="flex w-full">
                        <CartButtons product={product} />
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-black sm:mt-20">
                {product.characteristics.map((characteristic, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="w-full p-3 text-center lg:p-5">
                                <span className="block rounded bg-white py-2 dark:text-neutral-900">
                                    {characteristic.title}
                                </span>
                            </div>
                            <span className="flex w-full items-center justify-center p-3 text-white lg:p-5">
                                {characteristic.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductPage;
