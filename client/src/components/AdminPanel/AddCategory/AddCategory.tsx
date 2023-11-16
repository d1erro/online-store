'use client';

import { SyntheticEvent, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSnackbar from '@/ui/CustomSnackbar/CustomSnackbar';
import addCategory from '@/http/categories/add-category';

export interface ICategoryFormInput {
    value: string;
}

const schemaAddCategoryForm = z.object({
    value: z
        .string()
        .min(1, { message: 'Не меньше 1 символа' })
        .max(32, { message: 'Не больше 32 символов' }),
});

function AddCategory() {
    const [open, setOpen] = useState(false);
    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
    const [snackBarIsSuccess, setSnackBarIsSuccess] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const handleCloseSnackbar = (
        event: SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarIsOpen(false);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        reset();
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            value: '',
        },
        resolver: zodResolver(schemaAddCategoryForm),
    });

    const onSubmit: SubmitHandler<ICategoryFormInput> = async (data) => {
        handleCloseDialog();

        return addCategory(data.value).then((res) => {
            if (res.statusCode === 500) {
                setSnackBarIsSuccess(false);
                setSnackBarMessage(res.message);
                setSnackBarIsOpen(true);
            }
            if (res && res.value === data.value) {
                setSnackBarIsSuccess(true);
                setSnackBarMessage(
                    `Категория "${data.value}" успешно сохранен`,
                );
                setSnackBarIsOpen(true);
            }
        });
    };

    return (
        <>
            <div className="mt-10">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpen(true)}
                >
                    Добавить категорию
                </Button>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Добавление категории</DialogTitle>
                    <DialogContent>
                        <Controller
                            name="value"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    margin="dense"
                                    id="value"
                                    label="Название категории"
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.value}
                                    helperText={errors.value?.message}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Отмена</Button>
                        <Button type="submit">Добавить</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <CustomSnackbar
                open={snackBarIsOpen}
                handleClose={handleCloseSnackbar}
                message={snackBarMessage}
                success={snackBarIsSuccess}
            />
        </>
    );
}

export default AddCategory;
