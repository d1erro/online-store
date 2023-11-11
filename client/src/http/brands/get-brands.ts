async function getBrands() {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`, {
        method: 'GET',
    }).then((res) => res.json());
}

export default getBrands;
