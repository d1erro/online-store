'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormInput } from '@/types/Login/Login.types';

const LoginForm: FC = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ILoginFormInput>();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
                setError('Wrong login or password');
            } else if (res && !res.error) {
                setError(null);
                router.push('/profile');
                router.refresh();
            } else {
                setLoading(false);
                setError('Something wrong. Please try again later.');
            }
        } catch (error) {
            setLoading(false);
            setError('Request timed out. Please try again later.');
        }
    };

    const inputStyles =
        'block w-full rounded-lg border p-2.5 text-sm text-black';

    return (
        <div className="container mx-auto my-[5vh] max-w-[500px] rounded bg-gray-100 p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'grid grid-cols-1 gap-3'}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: true,
                            })}
                            placeholder="user@mail.ru"
                            className={inputStyles}
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="m-1 rounded bg-red-300 text-center text-sm">
                                Email field is required
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input
                            {...register('password', {
                                required: true,
                            })}
                            placeholder="••••••••••"
                            type="password"
                            className={inputStyles}
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="m-1 rounded bg-red-300 text-center text-sm">
                                Password field is required
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="rounded bg-red-300 py-1 text-center text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center rounded bg-amber-400 py-2 hover:bg-amber-500"
                    >
                        {loading && (
                            <span
                                className="mr-1 inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-amber-600 border-t-transparent"
                                role="status"
                                aria-label="loading"
                            ></span>
                        )}
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
