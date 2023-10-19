import { FC, useEffect, useState } from 'react';
import ProfileTextField from '@/components/ui/ProfileTextField/ProfileTextField';
import { updateUser } from '@/app/api/user/update-user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Session } from 'next-auth';
import { updateAddress } from '@/app/api/user/update-address';
import { getAddressById } from '@/app/api/user/get-address-by-id';

export interface IAddressInfoFormInput {
    region: string;
    city: string;
    street: string;
    index: string;
}

interface IAddressInfoProps {
    session: Session;
    update: (session: Session) => void;
}

const AddressInfo: FC<IAddressInfoProps> = ({ session, update }) => {
    const [address, setAddress] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAddress = async () => {
            const addressData = await getAddressById(
                session.user.addresses[0],
                session.backendTokens.accessToken,
            );
            setAddress(addressData);
        };

        fetchAddress();
        setLoading(false);
    });

    const [disabled, setDisabled] = useState<boolean>(true);

    const { control, handleSubmit } = useForm({});

    const onSubmit: SubmitHandler<IAddressInfoFormInput> = (data) => {
        setDisabled(true);
        console.log(data);
        updateAddress(address._id, data, session.backendTokens.accessToken);
    };

    return (
        <>
            <header className="flex gap-3 items-center">
                <h2 className="font-bold">Адрес доставки</h2>
                <button
                    className="text-sm"
                    onClick={() => setDisabled(!disabled)}
                >
                    {disabled ? 'Изменить' : 'Отменить'}
                </button>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex my-3 justify-between">
                    <Controller
                        name="region"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="region"
                                label="Регион"
                                defaultValue={address ? address.region : ''}
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="city"
                                label="Город"
                                defaultValue={address ? address.city : ''}
                                disabled={disabled}
                            />
                        )}
                    />
                </div>

                <div className="flex my-3 justify-between">
                    <Controller
                        name="street"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="street"
                                label="Улица, дом, квартира"
                                defaultValue={address ? address.street : ''}
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        name="index"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="index"
                                label="Индекс"
                                defaultValue={address ? address.index : ''}
                                disabled={disabled}
                            />
                        )}
                    />
                </div>

                {!disabled && (
                    <button
                        className="py-1 px-5 bg-gray-400 rounded"
                        type="submit"
                    >
                        Сохранить
                    </button>
                )}
            </form>
        </>
    );
};

export default AddressInfo;
