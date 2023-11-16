import { Controller, FieldErrors, SubmitHandler } from 'react-hook-form';
import {
    Alert,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { IRegistrationFormInput } from '@/components/Auth/Registration/Registration';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

interface ILoginFormProps {
    control: any;
    handleSubmit: any;
    onSubmit: SubmitHandler<IRegistrationFormInput>;
    errors: FieldErrors<IRegistrationFormInput>;
    error: string;
    loading: boolean;
}

const RegistrationForm = ({
    control,
    handleSubmit,
    onSubmit,
    errors,
    error,
    loading,
}: ILoginFormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

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
                        <FormControl variant="outlined">
                            <InputLabel
                                error={!!errors.password}
                                htmlFor="password"
                            >
                                Пароль
                            </InputLabel>
                            <OutlinedInput
                                {...field}
                                id="password"
                                error={!!errors.password}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Пароль"
                            />
                            {errors.password && (
                                <FormHelperText id="password" error>
                                    {errors.password?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="outlined">
                            <InputLabel
                                error={!!errors.confirmPassword}
                                htmlFor="confirmPassword"
                            >
                                Подтверждение пароля
                            </InputLabel>
                            <OutlinedInput
                                {...field}
                                id="confirmPassword"
                                error={!!errors.password}
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Подтверждение пароля"
                            />
                            {errors.confirmPassword && (
                                <FormHelperText id="confirmPassword" error>
                                    {errors.confirmPassword?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
            </div>

            {error && (
                <Alert
                    severity="error"
                    variant="outlined"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    {error}
                </Alert>
            )}

            <LoadingButton
                type="submit"
                loading={loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="contained"
                color="secondary"
                fullWidth
                className="my-3 dark:bg-neutral-700"
            >
                <span>Зарегистрироваться</span>
            </LoadingButton>
        </form>
    );
};

export default RegistrationForm;
