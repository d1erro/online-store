import { z } from 'zod';

export const schemaLoginForm = z.object({
    email: z.string().email({ message: 'Некорректная электронная почта' }),
    password: z.string().min(1, { message: 'Обязательное поле' }),
});
