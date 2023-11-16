export interface IGetAddressById {
    addressId: string;
    region: string;
    city: string;
    street: string;
    index: string;
}

export const getAddressById = async (id: string, accessToken: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.json();
    } catch (e) {
        console.error(e);
    }
};
