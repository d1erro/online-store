import { getProductById } from '@/http/products/get-product-by-id';
import { IProduct } from '@/types/Product/IProduct';
import ImageSlider from '@/components/Product/ProductPage/ImagesSwiper';
import CartCount from '@/components/Product/ProductPage/CartCount';
import { formatPrice } from '@/utils/format-price';

async function ProductPage({ productId }: { productId: string }) {
    const product: IProduct = await getProductById(productId);
    return (
        <section className="mt-5 flex flex-col">
            <h2 className="mb-10 mt-10 text-center text-3xl">
                {product.title}
            </h2>

            <div className="flex items-center">
                <div className="w-[40%]">
                    <ImageSlider images={product.images} />
                </div>

                <div className="ml-[5%] flex w-[55%] flex-col">
                    <div className="mb-5 max-w-max bg-black px-5 py-2 text-white">
                        <span>Категория: {product.category.value}</span>
                    </div>

                    <div className="mb-5 max-w-max bg-black px-5 py-2 text-white">
                        <span>Производитель: {product.brand.value}</span>
                    </div>

                    <div className="mb-10 max-w-max bg-black px-5 py-2 text-white">
                        <span>В наличии: {product.inStock}</span>
                    </div>

                    <p className="mb-8">{`${product.description}`}</p>

                    <div className="mb-10 max-w-max rounded-xl bg-black px-14 py-3 text-3xl text-white">
                        <span>{formatPrice.format(product.price)}</span>
                    </div>

                    <div className="flex gap-8">
                        <CartCount />

                        <button className="rounded-xl bg-black px-14 py-3 text-white">
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-20 rounded-xl bg-black">
                {product.characteristics.map((characteristic, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="w-full p-5 text-center">
                                <span className="block rounded bg-white py-2">
                                    {characteristic.title}
                                </span>
                            </div>
                            <span className="w-full p-5 text-center text-white">
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
