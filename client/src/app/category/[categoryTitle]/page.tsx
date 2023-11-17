import CategoryList from '@/components/Product/CategoryList';

async function Page({ params }: { params: { categoryTitle: string } }) {
    return <CategoryList categoryTitle={params.categoryTitle} />;
}

export default Page;
