'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateAddress } from '@/http/users/update-address';
import { getAddressById } from '@/http/users/get-address-by-id';
import {
    IAddress,
    IAddressInfo,
} from '@/types/Profile/AddressInfo/AddressInfo.types';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSnackbar from '@/ui/CustomSnackbar/CustomSnackbar';
import { Session } from 'next-auth';
import AddressInfoForm from '@/components/Profile/ProfileData/AddressInfo/AddressInfoForm/AddressInfoForm';
import { schemaAddressInfoForm } from '@/components/Profile/ProfileData/AddressInfo/AddressInfoForm/schemaAddressInfoForm';

const AddressInfo = ({ session }: { session: Session }) => {
    const [address, setAddress] = useState<IAddress | null>(null);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
    const [snackBarIsSuccess, setSnackBarIsSuccess] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        clearErrors,
    } = useForm({
        resolver: zodResolver(schemaAddressInfoForm),
    });

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarIsOpen(false);
    };

    useEffect(() => {
        getAddressById(
            session.user.addresses[0],
            session.backendTokens.accessToken,
        ).then((res) => {
            setAddress(res);
            setValue('region', res.region);
            setValue('city', res.city);
            setValue('street', res.street);
            setValue('index', res.index);
        });
    }, []);

    const onSubmit: SubmitHandler<IAddressInfo> = async (data) => {
        await updateAddress(
            session.user.addresses[0],
            data,
            session.backendTokens.accessToken,
        ).then((res) => {
            if (res._id) {
                setDisabled(true);
                setSnackBarIsSuccess(true);
                setSnackBarMessage('Адрес успешно сохранен');
                setSnackBarIsOpen(true);
            }
            if (res.error) {
                setSnackBarIsSuccess(false);
                setSnackBarMessage(res.message[0]);
                setSnackBarIsOpen(true);
            }
        });
    };

    return (
        <>
            <header className="flex items-center gap-3">
                <h2 className="font-bold">Адрес доставки</h2>
                <button
                    className="text-sm"
                    onClick={
                        disabled
                            ? () => setDisabled(false)
                            : () => {
                                  setValue('region', address?.region);
                                  setValue('city', address?.city);
                                  setValue('street', address?.street);
                                  setValue('index', address?.index);
                                  clearErrors();
                                  setDisabled(true);
                              }
                    }
                >
                    {disabled ? 'Изменить' : 'Отменить'}
                </button>
            </header>

            <AddressInfoForm
                handleSubmit={handleSubmit}
                disabled={disabled}
                onSubmit={onSubmit}
                control={control}
                errors={errors}
            />

            <CustomSnackbar
                open={snackBarIsOpen}
                handleClose={handleClose}
                message={snackBarMessage}
                success={snackBarIsSuccess}
            />
        </>
    );
};

export default AddressInfo;
