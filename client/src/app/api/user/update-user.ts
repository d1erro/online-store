export interface IUpdateUser {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export const updateUser = async (
    id: string,
    user: IUpdateUser,
    accessToken: string,
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/update-info`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        },
    );
    const data = await response.json();
    return data;
};
