import ProductList from '@/components/Product/ProductList';
import { IProduct } from '@/types/Product/IProduct';
import { getProducts } from '@/http/products/get-products';

async function HomePage() {
    const products: IProduct[] = await getProducts();
    return <ProductList products={products} />;
}

export default HomePage;
