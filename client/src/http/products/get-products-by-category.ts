export async function getProductsByCategory(categoryTitle: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/category/${categoryTitle}`,
        );
        return res.json();
    } catch (e) {
        console.error(e);
    }
}
