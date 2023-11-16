import z from 'zod';

const russianPhoneNumberPattern = /^((\+7|7|8)+([0-9]){10})$/;

export const schemaUserInfoForm = z.object({
    first_name: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .min(2, { message: 'Не меньше 2 символов' })
        .max(32, { message: 'Не больше 32 символов' }),
    last_name: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .min(2, { message: 'Не меньше 2 символов' })
        .max(32, { message: 'Не больше 32 символов' }),
    email: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .email({ message: 'Некорректная электронная почта' }),
    phone: z
        .string({
            required_error: 'Обязательное поле',
            invalid_type_error: 'Обязательное поле',
        })
        .regex(russianPhoneNumberPattern, {
            message: 'Номер телефона должен быть в формате +79998887654',
        }),
});
