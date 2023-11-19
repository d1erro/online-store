import { IProduct } from '@/types/Product/IProduct';
import { getProductsByCategory } from '@/http/products/get-products-by-category';
import ProductList from '@/components/Product/ProductList';

async function CategoryPage({ categoryTitle }: { categoryTitle: string }) {
    const products: IProduct[] = await getProductsByCategory(categoryTitle);
    return <ProductList products={products} />;
}

export default CategoryPage;
