import { IAddressInfoFormInput } from '@/components/Profile/ProfileForm/AddressInfo';

export interface IUpdateAddress {
    addressId: string;
    region: string;
    city: string;
    street: string;
    index: string;
}

export const updateAddress = async (
    id: string,
    address: IAddressInfoFormInput,
    accessToken: string,
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(address),
        },
    );
    const updatedAddress = await response.json();
    return updatedAddress;
};
