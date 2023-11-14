import { getProducts } from '@/http/products/get-products';
import ProductItem from '@/components/Product/ProductItem';
import { IProduct } from '@/types/Product/IProduct';

async function ProductList() {
    const products: IProduct[] = await getProducts();

    if (products && products.length > 0) {
        return (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: IProduct) => {
                    return <ProductItem key={product._id} product={product} />;
                })}
            </div>
        );
    }
    return <p className="mt-10 text-center">Products not found</p>;
}

export default ProductList;
