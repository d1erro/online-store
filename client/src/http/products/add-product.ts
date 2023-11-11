async function addProduct(product: FormData) {
    try {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
            method: 'POST',
            body: product,
        })
            .then((res) => res.json())
            .catch((err) => err);
    } catch (e) {
        console.log(e);
    }
}

export default addProduct;
