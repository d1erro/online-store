async function getCategories() {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
        method: 'GET',
    }).then((res) => res.json());
}

export default getCategories;
