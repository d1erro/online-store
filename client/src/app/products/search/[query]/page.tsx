import SearchPage from '@/components/pages/SearchPage/SearchPage';

async function Page({ params }: { params: { query: string } }) {
    return <SearchPage query={params.query} />;
}

export default Page;
