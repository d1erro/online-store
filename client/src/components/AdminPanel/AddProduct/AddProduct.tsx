'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import addProduct from '@/http/products/add-product';
import { ICharacteristic } from '@/types/Product/ICharacteristic';
import getBrands from '@/http/brands/get-brands';
import getCategories from '@/http/categories/get-categories';
import { Brand, Category } from '@/types/AdminPanel/AdminPanel.types';
import AddProductForm from '@/components/AdminPanel/AddProduct/AddProductForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaAddProductForm = z.object({});

const AddProduct = () => {
    const [brands, setBrands] = useState<Brand[] | []>([]);
    const [categories, setCategories] = useState<Category[] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const brands = getBrands().then((res) => {
            setBrands(res);
        });
        const categories = getCategories().then((res) => {
            setCategories(res);
        });
        setLoading(false);
    }, []);

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

    const removeCharacteristic = (number: number) => {
        setCharacteristics(characteristics.filter((i) => i.number !== number));
    };

    const { control, handleSubmit, register } = useForm({
        resolver: zodResolver(schemaAddProductForm),
    });

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
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
        />
    );
};

export default AddProduct;
