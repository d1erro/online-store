import { getProducts } from '@/http/products/get-products';
import ProductItem from '@/components/Product/ProductItem';
import { IProduct } from '@/types/Product/IProduct';

async function ProductList() {
    const products: IProduct[] = await getProducts();

    if (products && products.length > 0) {
        return (
            <div className="mt-10 grid grid-cols-3 gap-5">
                {products.map((product: IProduct) => {
                    return <ProductItem key={product._id} product={product} />;
                })}
            </div>
        );
    }
    return <p className="text-center mt-10">Products not found</p>;
}

export default ProductList;
