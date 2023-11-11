import { IAddressInfo } from '@/types/Profile/AddressInfo/AddressInfo.types';

export const updateAddress = async (
    id: string,
    address: IAddressInfo,
    accessToken: string,
) => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
    }).then((res) => res.json());
};
