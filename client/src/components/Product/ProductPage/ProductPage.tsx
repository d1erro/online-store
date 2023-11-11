import { getProductById } from '@/http/products/get-product-by-id';
import { IProduct } from '@/types/Product/IProduct';
import ImageSlider from '@/components/Product/ProductPage/ImagesSwiper';
import CartCount from '@/components/Product/ProductPage/CartCount';

async function ProductPage({ productId }: { productId: string }) {
    const product: IProduct = await getProductById(productId);
    return (
        <section className="mt-5 flex flex-col">
            <h2 className="text-center text-3xl mt-10 mb-10">
                {product.title}
            </h2>

            <div className="flex items-center">
                <div className="w-[40%]">
                    <ImageSlider images={product.images} />
                </div>

                <div className="w-[55%] ml-[5%] flex flex-col">
                    <div className="max-w-max px-5 py-2 bg-black text-white mb-5">
                        <span>Категория: {product.category.value}</span>
                    </div>

                    <div className="max-w-max px-5 py-2 bg-black text-white mb-5">
                        <span>Производитель: {product.brand.value}</span>
                    </div>

                    <div className="max-w-max px-5 py-2 bg-black text-white mb-10">
                        <span>В наличии: {product.inStock}</span>
                    </div>

                    <p className="mb-8">{`${product.description}`}</p>

                    <div className="max-w-max bg-black text-white text-3xl mb-10 rounded-xl px-14 py-3">
                        <span>{product.price} ₽</span>
                    </div>

                    <div className="flex gap-8">
                        <CartCount />

                        <button className="bg-black text-white px-14 py-3 rounded-xl">
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-20 bg-black rounded-xl">
                {product.characteristics.map((characteristic, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="p-5 w-full text-center">
                                <span className="block bg-white rounded py-2">
                                    {characteristic.title}
                                </span>
                            </div>
                            <span className="text-white p-5 w-full text-center">
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
