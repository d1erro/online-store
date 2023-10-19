import { FC, useState } from 'react';
import { IUserInfoProps } from '@/components/profile/ProfileForm/ProfileForm.types';
import ProfileTextField from '@/components/ui/ProfileTextField/ProfileTextField';
import { updateUser } from '@/app/api/user/update-user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IUserInfoFormInput {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

const UserInfo: FC<IUserInfoProps> = ({ session, update }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            first_name: session.user.first_name,
            last_name: session.user.last_name,
            email: session.user.email,
            phone: session.user.phone,
        },
    });

    const onSubmit: SubmitHandler<IUserInfoFormInput> = (data) => {
        setDisabled(true);
        updateUser(
            session.user._id,
            data,
            session.backendTokens.accessToken,
        ).then((user) => {
            update({ ...session, user: user });
        });
    };

    return (
        <>
            <header className="flex gap-3 items-center">
                <h2 className="font-bold">Информация о покупателе</h2>
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
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="first_name"
                                label="Имя"
                                defaultValue={session.user.first_name}
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="last_name"
                                label="Фамилия"
                                defaultValue={session.user.last_name}
                                disabled={disabled}
                            />
                        )}
                    />
                </div>

                <div className="flex my-3 justify-between">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="email"
                                label="Электронная почта"
                                defaultValue={session.user.email}
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="phone"
                                label="Телефон"
                                defaultValue={session.user.phone}
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

export default UserInfo;
