import SearchList from '@/components/Product/SearchList';

async function Page({ params }: { params: { query: string } }) {
    return <SearchList query={params.query} />;
}

export default Page;
