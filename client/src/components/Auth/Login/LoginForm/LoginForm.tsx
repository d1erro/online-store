import { Controller, FieldErrors, SubmitHandler } from 'react-hook-form';
import { TextField } from '@mui/material';
import { ILoginFormInput } from '@/types/Login/Login.types';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

interface ILoginFormProps {
    control: any;
    handleSubmit: any;
    onSubmit: SubmitHandler<ILoginFormInput>;
    errors: FieldErrors<ILoginFormInput>;
    error: string;
    loading: boolean;
}

const LoginForm = ({
    control,
    handleSubmit,
    onSubmit,
    errors,
    error,
    loading,
}: ILoginFormProps) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 flex flex-col gap-5">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="email"
                            label="Почта"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="password"
                            label="Пароль"
                            variant="outlined"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />
            </div>

            {error && (
                <div className="mb-3 rounded bg-red-200 px-5 text-center">
                    {error}
                </div>
            )}

            <LoadingButton
                type="submit"
                loading={loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="contained"
                color="secondary"
                fullWidth
                className="mb-3 dark:bg-neutral-700"
            >
                <span>Войти</span>
            </LoadingButton>
        </form>
    );
};

export default LoginForm;
