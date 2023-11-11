import { z } from 'zod';

const isNumeric = /^\d+$/;

export const schemaAddProductForm = z.object({
    title: z
        .string({ required_error: 'Обязательное поле' })
        .min(3, { message: 'Не менее 3 символов' })
        .max(40, { message: 'Не более 40 символов' }),
    description: z
        .string({ required_error: 'Обязательное поле' })
        .min(100, { message: 'Не менее 100 символов' })
        .max(5000, { message: 'Не более 5000 символов' }),
    price: z
        .string({ required_error: 'Обязательное поле' })
        .min(1, { message: 'Не менее 1 символов' })
        .max(20, { message: 'Не более 20 символов' })
        .regex(isNumeric, { message: 'Должно быть числом' }),
    inStock: z
        .string({ required_error: 'Обязательное поле' })
        .min(1, { message: 'Не менее 1 символов' })
        .max(20, { message: 'Не более 20 символов' })
        .regex(isNumeric, { message: 'Должно быть числом' }),
    brand: z.string({ required_error: 'Обязательное поле' }),
    category: z.string({ required_error: 'Обязательное поле' }),
    images: z.any(),
});
