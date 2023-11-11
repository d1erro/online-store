import { getProducts } from '@/http/products/get-products';
import ProductItem from '@/components/Product/ProductItem';
import { IProduct } from '@/types/Product/IProduct';

async function ProductList() {
    const products: IProduct[] = await getProducts();

    return (
        <>
            {products.map((product: IProduct) => {
                return <ProductItem key={product._id} product={product} />;
            })}
        </>
    );
}

export default ProductList;
