'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {
    Autocomplete,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Stack,
    TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const AdminButtons: React.FC = () => {
    const brands = [
        {
            title: 'Samsung',
            id: '653fa60c577a65583548fbe5',
        },
        {
            title: 'Apple',
            id: '653fa60c577a65583548fbe6',
        },
    ];

    const categories = [
        {
            title: 'Корпуса',
            id: '653faa0ced83013ae4f4aae0',
        },
        {
            title: 'Материнские платы',
            id: '653faa0ced83013ae4f4aae1',
        },
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { control, handleSubmit } = useForm({});
    const onSubmit = (data: any) => console.log(data);

    return (
        <div className="ml-5">
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Добавить товар
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle textAlign="center">
                        Добавление товара
                    </DialogTitle>
                    <DialogContent>
                        <Box component="form" marginTop="10px">
                            <FormControl>
                                <form
                                    id="addProductForm"
                                    className="flex flex-col gap-5 w-[500px]"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Controller
                                        name="brand"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="brand"
                                                options={brands}
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                onChange={(_, data) =>
                                                    field.onChange(data.id)
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Бренд"
                                                    />
                                                )}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="category"
                                                options={categories}
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                onChange={(_, data) =>
                                                    field.onChange(data.id)
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Категория"
                                                    />
                                                )}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Название"
                                                variant="outlined"
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Описание"
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Цена"
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="inStock"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="В наличии"
                                            />
                                        )}
                                    />
                                </form>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Stack
                            width="100%"
                            marginInline="15px"
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                color="error"
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                variant="outlined"
                                color="success"
                                type="submit"
                                form="addProductForm"
                            >
                                Добавить
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default AdminButtons;
