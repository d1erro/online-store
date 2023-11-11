async function addBrand(brandName: string) {
    const newBrand = {
        value: `${brandName}`,
    };
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBrand),
    }).then((res) => res.json());
}

export default addBrand;
