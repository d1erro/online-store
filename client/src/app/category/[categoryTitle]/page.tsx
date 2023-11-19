import CategoryPage from '@/components/CategoryPage/CategoryPage';

async function Page({ params }: { params: { categoryTitle: string } }) {
    return <CategoryPage categoryTitle={params.categoryTitle} />;
}

export default Page;
