export async function getProductsBySearch(query: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/search/${query}`,
        );
        return res.json();
    } catch (e) {
        console.error(e);
    }
}
