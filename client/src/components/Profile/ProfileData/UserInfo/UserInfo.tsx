'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { updateUser } from '@/http/users/update-user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserInfoForm from '@/components/Profile/ProfileData/UserInfo/UserInfoForm/UserInfoForm';
import { schemaUserInfoForm } from '@/components/Profile/ProfileData/UserInfo/UserInfoForm/schemaUserInfoForm';
import { IUserInfoFormInput } from '@/types/Profile/UserInfo/UserInfo.types';
import { Session } from 'next-auth';
import { getUser } from '@/http/users/get-user';
import CustomSnackbar from '@/ui/CustomSnackbar/CustomSnackbar';
import { User } from '@/lib/types';

const UserInfo = ({ session }: { session: Session }) => {
    const [user, setUser] = useState<User>();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
    const [snackBarIsSuccess, setSnackBarIsSuccess] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarIsOpen(false);
    };

    useEffect(() => {
        getUser(session.user._id, session.backendTokens.accessToken).then(
            (res) => {
                setUser(res);
                setValue('first_name', res.first_name);
                setValue('last_name', res.last_name);
                setValue('email', res.email);
                setValue('phone', res.phone);
            },
        );
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm({ resolver: zodResolver(schemaUserInfoForm) });

    const onSubmit: SubmitHandler<IUserInfoFormInput> = async (data) => {
        await updateUser(
            session.user._id,
            data,
            session.backendTokens.accessToken,
        ).then((res) => {
            if (res._id) {
                setDisabled(true);
                setSnackBarIsSuccess(true);
                setSnackBarMessage('Данные успешно сохранены');
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
            <header className="flex gap-3 items-center">
                <h2 className="font-bold">Информация о покупателе</h2>
                <button
                    className="text-sm"
                    onClick={
                        disabled
                            ? () => setDisabled(false)
                            : () => {
                                  setValue('first_name', user?.first_name);
                                  setValue('last_name', user?.last_name);
                                  setValue('email', user?.email);
                                  setValue('phone', user?.phone);
                                  clearErrors();
                                  setDisabled(true);
                              }
                    }
                >
                    {disabled ? 'Изменить' : 'Отменить'}
                </button>
            </header>

            <UserInfoForm
                errors={errors}
                control={control}
                disabled={disabled}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
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

export default UserInfo;