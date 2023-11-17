import { IProduct } from '@/types/Product/IProduct';
import ProductItem from '@/components/Product/ProductItem';
import { getProductsBySearch } from '@/http/products/get-products-by-search';

async function SearchList({ query }: { query: string }) {
    const products: IProduct[] = await getProductsBySearch(query);

    if (products && products.length > 0) {
        return (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: IProduct) => {
                    return <ProductItem key={product._id} product={product} />;
                })}
            </div>
        );
    }
    return <h2 className="mt-10 text-center text-xl">Товары не найдены</h2>;
}

export default SearchList;
