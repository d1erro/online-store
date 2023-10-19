export interface IGetAddressById {
    addressId: string;
    region: string;
    city: string;
    street: string;
    index: string;
}

export const getAddressById = async (id: string, accessToken: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addresses/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    const address = await response.json();
    return address;
};
