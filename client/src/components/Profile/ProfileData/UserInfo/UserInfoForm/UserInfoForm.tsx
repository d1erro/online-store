import { Controller } from 'react-hook-form';
import ProfileTextField from '@/ui/ProfileTextField/ProfileTextField';
import { IUserInfoFormProps } from '@/types/Profile/UserInfo/UserInfo.types';

function UserInfoForm({
    disabled,
    handleSubmit,
    onSubmit,
    errors,
    control,
}: IUserInfoFormProps) {
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3 flex justify-between">
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="first_name"
                                label="Имя"
                                disabled={disabled}
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message}
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
                                disabled={disabled}
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                            />
                        )}
                    />
                </div>

                <div className="my-3 flex justify-between">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <ProfileTextField
                                {...field}
                                id="email"
                                label="Электронная почта"
                                disabled={disabled}
                                error={!!errors.email}
                                helperText={errors.email?.message}
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
                                disabled={disabled}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />
                </div>

                {!disabled && (
                    <button
                        className="rounded bg-gray-400 px-5 py-1"
                        type="submit"
                    >
                        Сохранить
                    </button>
                )}
            </form>
        </>
    );
}

export default UserInfoForm;
