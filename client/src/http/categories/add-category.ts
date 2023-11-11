async function addCategory(categoryName: string) {
    const newCategory = {
        value: `${categoryName}`,
    };
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
    }).then((res) => res.json());
}

export default addCategory;
