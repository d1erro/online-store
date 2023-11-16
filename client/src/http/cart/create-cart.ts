async function createCart(cart: object) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        },
    );
    return response.json();
}

export default createCart;
