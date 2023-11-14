import { Controller } from 'react-hook-form';
import ProfileTextField from '@/ui/ProfileTextField/ProfileTextField';
import { IAddressInfoFormProps } from '@/types/Profile/AddressInfo/AddressInfo.types';

function AddressInfoForm({
    handleSubmit,
    onSubmit,
    control,
    disabled,
    errors,
}: IAddressInfoFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3 flex flex-col justify-between gap-3 md:flex-row">
                <Controller
                    name="region"
                    control={control}
                    render={({ field }) => (
                        <ProfileTextField
                            {...field}
                            id="region"
                            label="Регион"
                            disabled={disabled}
                            helperText={errors.region?.message}
                            error={!!errors.region}
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
                            helperText={errors.city?.message}
                            error={!!errors.city}
                        />
                    )}
                />
            </div>

            <div className="my-3 flex flex-col justify-between gap-3 md:flex-row">
                <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                        <ProfileTextField
                            {...field}
                            id="street"
                            label="Улица, дом, квартира"
                            disabled={disabled}
                            helperText={errors.street?.message}
                            error={!!errors.street}
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
                            helperText={errors.index?.message}
                            error={!!errors.index}
                        />
                    )}
                />
            </div>

            {!disabled && (
                <button className="rounded bg-gray-400 px-5 py-1" type="submit">
                    Сохранить
                </button>
            )}
        </form>
    );
}

export default AddressInfoForm;
