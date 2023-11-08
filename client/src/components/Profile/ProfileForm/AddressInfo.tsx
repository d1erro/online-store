import { FC, useEffect, useState } from 'react';
import ProfileTextField from '@/ui/ProfileTextField/ProfileTextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Session } from 'next-auth';
import { updateAddress } from '@/http/users/update-address';
import { getAddressById } from '@/http/users/get-address-by-id';

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

interface IAddress {
    _id: string;
    userId: string;
    region: string;
    city: string;
    street: string;
    index: string;
    default: boolean;
}

const AddressInfo: FC<IAddressInfoProps> = ({ session }) => {
    const [address, setAddress] = useState<IAddress | null>(null);

    useEffect(() => {
        const updateValues = (address: IAddressInfoFormInput) => {
            setValue('region', address.region);
            setValue('city', address.city);
            setValue('street', address.street);
            setValue('index', address.index);
        };

        getAddressById(
            session.user.addresses[0],
            session.backendTokens.accessToken,
        ).then((data) => {
            setAddress(data);
            updateValues(data);
        });
    }, []);

    const [disabled, setDisabled] = useState<boolean>(true);

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            region: '',
            city: '',
            street: '',
            index: '',
        },
    });

    const onSubmit: SubmitHandler<IAddressInfoFormInput> = (data) => {
        setDisabled(true);
        if (address !== null) {
            updateAddress(address._id, data, session.backendTokens.accessToken);
        }
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
