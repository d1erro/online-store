'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormInput } from '@/types/Login/Login.types';
import LoginForm from '@/components/Auth/Login/LoginForm/LoginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLoginForm } from '@/components/Auth/Login/LoginForm/schemaLoginForm';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Login = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInput>({
        resolver: zodResolver(schemaLoginForm),
    });

    const onSubmit: SubmitHandler<ILoginFormInput> = async ({
        email,
        password,
    }) => {
        setLoading(true);
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res && res.error === 'CredentialsSignin') {
                setLoading(false);
                setError('Неверный логин или пароль');
            } else if (res && !res.error) {
                setError('');
                router.push('/profile');
                router.refresh();
            } else {
                setLoading(false);
                setError('Сервер не отвечает. Повторите попытку позже.');
            }
        } catch (error) {
            setLoading(false);
            setError(`Ошибка - ${error}. Повторите попытку позже.`);
        }
    };

    return (
        <div className="container my-[5vh] max-w-[500px] rounded border border-neutral-500 p-5">
            <h2 className="mb-8 text-center text-xl">Авторизация</h2>
            <LoginForm
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                error={error}
                loading={loading}
            />

            <Link href="/registration">
                <Button
                    className="dark:bg-neutral-700"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Регистрация
                </Button>
            </Link>
        </div>
    );
};

export default Login;
