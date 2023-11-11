async function addProduct(product: FormData) {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        method: 'POST',
        body: product,
    })
        .then((res) => res.json())
        .catch((err) => err);
}

export default addProduct;
