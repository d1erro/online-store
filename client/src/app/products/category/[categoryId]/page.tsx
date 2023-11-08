function Page({ params }: { params: { categoryId: string } }) {
    return <div>{params.categoryId}</div>;
}

export default Page;
