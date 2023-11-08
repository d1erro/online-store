export async function getProducts() {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        cache: 'no-store',
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}
