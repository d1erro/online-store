'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { SyntheticEvent, useEffect, useState } from 'react';
import addProduct from '@/http/products/add-product';
import { ICharacteristic } from '@/types/Product/ICharacteristic';
import getBrands from '@/http/brands/get-brands';
import getCategories from '@/http/categories/get-categories';
import { Brand, Category } from '@/types/AdminPanel/AdminPanel.types';
import AddProductForm from '@/components/AdminPanel/AddProduct/AddProductForm/AddProductForm';
import { IProductInfo } from '@/types/AdminPanel/IProductInfo.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaAddProductForm } from '@/components/AdminPanel/AddProduct/AddProductForm/schemaAddProductForm';
import CustomSnackbar from '@/ui/CustomSnackbar/CustomSnackbar';

const AddProduct = () => {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState<Brand[] | []>([]);
    const [categories, setCategories] = useState<Category[] | []>([]);
    const [characteristics, setCharacteristics] = useState<
        ICharacteristic[] | []
    >([]);
    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
    const [snackBarIsSuccess, setSnackBarIsSuccess] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schemaAddProductForm) });

    useEffect(() => {
        const brands = getBrands().then((res) => {
            setBrands(res);
        });
        const categories = getCategories().then((res) => {
            setCategories(res);
        });
        setLoading(false);
    }, []);

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

    const removeCharacteristic = (number: number) => {
        setCharacteristics(characteristics.filter((i) => i.number !== number));
    };

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarIsOpen(false);
    };

    const onSubmit: SubmitHandler<IProductInfo> = async (data) => {
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
        await addProduct(formData).then((res) => {
            if (res && res._id) {
                setSnackBarIsSuccess(true);
                setSnackBarMessage(`Продукт "${res.title}" успешно сохранен`);
                setSnackBarIsOpen(true);
                reset({
                    title: '',
                    description: '',
                    price: '',
                    inStock: '',
                    images: null,
                    category: '',
                    brand: '',
                });
                setCharacteristics([]);
            }
            if (res && !res._id) {
                setSnackBarIsSuccess(false);
                if (Array.isArray(res.message)) {
                    setSnackBarMessage(res.message[0]);
                } else {
                    setSnackBarMessage(res.message);
                }
                setSnackBarIsOpen(true);
            }
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <AddProductForm
                control={control}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                categories={categories}
                brands={brands}
                characteristics={characteristics}
                addCharacteristic={addCharacteristic}
                changeCharacteristic={changeCharacteristic}
                removeCharacteristic={removeCharacteristic}
                errors={errors}
            />

            <CustomSnackbar
                open={snackBarIsOpen}
                handleClose={handleClose}
                message={snackBarMessage}
                success={snackBarIsSuccess}
            />
        </>
    );
};

export default AddProduct;
