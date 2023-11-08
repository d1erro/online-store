import ProductPage from '@/components/Product/ProductPage/ProductPage';

function Page({ params }: { params: { id: string } }) {
    return <ProductPage productId={params.id} />;
}

export default Page;
