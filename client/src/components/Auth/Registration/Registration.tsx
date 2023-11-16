'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaRegistrationForm } from '@/components/Auth/Registration/RegistrationForm/schemaRegistrationForm';
import { registration } from '@/http/auth/registration';
import RegistrationForm from '@/components/Auth/Registration/RegistrationForm/RegistrationForm';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export interface IRegistrationFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

function Registration() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegistrationFormInput>({
        resolver: zodResolver(schemaRegistrationForm),
    });

    const onSubmit: SubmitHandler<IRegistrationFormInput> = async ({
        email,
        password,
    }) => {
        setLoading(true);
        try {
            const res = await registration(email, password);
            if (res && res.error) {
                setError(res.message);
                setLoading(false);
            }
            if (res && !res.error) {
                const signInResponse = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });
                if (signInResponse) {
                    router.push('/profile');
                    router.refresh();
                }
            }
        } catch (error) {
            setLoading(false);
            setError(`Ошибка - ${error}. Повторите попытку позже.`);
        }
    };

    return (
        <div className="container my-[5vh] max-w-[500px] rounded border border-neutral-500 p-5">
            <h2 className="mb-8 text-center text-xl">Регистрация</h2>
            <RegistrationForm
                loading={loading}
                error={error}
                errors={errors}
                control={control}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />

            <Link href="/login">
                <Button
                    className="dark:bg-neutral-700"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Войти
                </Button>
            </Link>
        </div>
    );
}

export default Registration;
