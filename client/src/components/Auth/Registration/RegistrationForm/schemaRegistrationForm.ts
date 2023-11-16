import { z } from 'zod';

export const schemaRegistrationForm = z
    .object({
        email: z
            .string({ required_error: 'Обязательное поле' })
            .email({ message: 'Некорректная электронная почта' }),
        password: z
            .string({ required_error: 'Обязательное поле' })
            .min(8, { message: 'Не меньше 8 символов' })
            .max(32, { message: 'Не больше 32 символов' }),
        confirmPassword: z.string({ required_error: 'Обязательное поле' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });
