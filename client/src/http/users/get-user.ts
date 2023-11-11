export const getUser = async (id: string, accessToken: string) => {
    try {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((res) => res.json());
    } catch (e) {
        console.log(e);
    }
};
