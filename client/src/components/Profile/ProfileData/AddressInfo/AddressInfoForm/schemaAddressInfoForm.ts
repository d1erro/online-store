import { z } from 'zod';

const indexRegex = /^\d{6}$/;

export const schemaAddressInfoForm = z.object({
    region: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .min(1, { message: 'Не меньше 2 символов' })
        .max(24, { message: 'Не больше 24 символов' }),
    city: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .min(2, { message: 'Не меньше 2 символов' })
        .max(32, { message: 'Не больше 32 символов' }),
    street: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .min(2, { message: 'Не меньше 2 символов' })
        .max(32, { message: 'Не больше 32 символов' }),
    index: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .regex(indexRegex, { message: 'Введите 6 цифр' }),
});
