import { IProduct } from '@/types/Product/IProduct';
import { getProductsBySearch } from '@/http/products/get-products-by-search';
import ProductList from '@/components/Product/ProductList';

async function SearchPage({ query }: { query: string }) {
    const products: IProduct[] = await getProductsBySearch(query);
    return <ProductList products={products} />;
}

export default SearchPage;
