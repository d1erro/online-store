import ProductList from '@/components/Product/ProductList';

function Home() {
    return (
        <div className="mt-10 grid grid-cols-3 gap-5">
            <ProductList />
        </div>
    );
}

export default Home;
