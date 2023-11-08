export async function getProductById(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
        {
            cache: 'no-store',
        },
    );
    return response.json();
}
