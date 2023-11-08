'use client';

import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import addProduct from '@/http/products/add-product';
import { ICharacteristic } from '@/types/ICharacteristic';

const brands = [
    {
        title: 'Samsung',
        id: '653fa60c577a65583548fbe5',
    },
];

const categories = [
    {
        title: 'Корпуса',
        id: '653faa0ced83013ae4f4aae0',
    },
];

const AddProductForm = () => {
    const [characteristics, setCharacteristics] = useState<
        ICharacteristic[] | []
    >([]);

    const addCharacteristic = () => {
        setCharacteristics([
            ...characteristics,
            { title: '', value: '', number: Date.now() },
        ]);
    };

    const changeCharacteristic = (
        key: string,
        value: string,
        number: number,
    ) => {
        setCharacteristics(
            characteristics.map((i) =>
                i.number === number ? { ...i, [key]: value } : i,
            ),
        );
    };

    const removeСharacteristic = (number: number) => {
        setCharacteristics(characteristics.filter((i) => i.number !== number));
    };

    const { control, handleSubmit, register } = useForm({});

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('inStock', data.inStock);
        formData.append('category', data.category);
        formData.append('brand', data.brand);
        formData.append('characteristics', JSON.stringify(characteristics));
        for (let image of data.images) {
            formData.append('images', image);
        }
        await addProduct(formData);
    };

    return (
        <form
            id="addProductForm"
            className="flex flex-col gap-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        disablePortal
                        id="category"
                        options={categories}
                        getOptionLabel={(option) => option.title}
                        onChange={(_, data) => field.onChange(data.id)}
                        renderInput={(params) => (
                            <TextField {...params} label="Категория" />
                        )}
                    />
                )}
            />

            <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        disablePortal
                        id="brand"
                        options={brands}
                        getOptionLabel={(option) => option.title}
                        onChange={(_, data) => field.onChange(data.id)}
                        renderInput={(params) => (
                            <TextField {...params} label="Бренд" />
                        )}
                    />
                )}
            />

            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Название" variant="outlined" />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Описание" />
                )}
            />

            <Controller
                name="price"
                control={control}
                render={({ field }) => <TextField {...field} label="Цена" />}
            />

            <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="В наличии" />
                )}
            />

            <input
                {...register('images')}
                placeholder="Выберите изображения"
                type="file"
                multiple
            />

            <Button onClick={addCharacteristic}>Добавить характеристику</Button>

            {characteristics.map((i) => (
                <Stack direction="row" spacing={2} key={i.number}>
                    <TextField
                        fullWidth
                        value={i.title}
                        onChange={(e) =>
                            changeCharacteristic(
                                'title',
                                e.target.value,
                                i.number,
                            )
                        }
                        label="Название свойства"
                    />

                    <TextField
                        fullWidth
                        value={i.value}
                        onChange={(e) =>
                            changeCharacteristic(
                                'value',
                                e.target.value,
                                i.number,
                            )
                        }
                        label="Значение свойства"
                    />

                    <Button onClick={() => removeСharacteristic(i.number)}>
                        Удалить
                    </Button>
                </Stack>
            ))}

            <Button
                onClick={handleSubmit(onSubmit)}
                variant="outlined"
                color="success"
                type="submit"
                form="addProductForm"
            >
                Добавить товар
            </Button>
        </form>
    );
};

export default AddProductForm;
