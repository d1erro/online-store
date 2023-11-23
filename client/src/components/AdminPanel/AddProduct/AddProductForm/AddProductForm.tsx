import { Controller } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Brand, Category } from '@/types/AdminPanel/AdminPanel.types';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export interface Characteristic {
    title: string;
    value: string;
    number: number;
}

interface IAddProductFormProps {
    handleSubmit: any;
    onSubmit: any;
    control: any;
    categories: Category[];
    brands: Brand[];
    register: any;
    characteristics: Characteristic[];
    addCharacteristic: () => void;
    changeCharacteristic: (
        title: string,
        value: string,
        number: number,
    ) => void;
    removeCharacteristic: (number: number) => void;
    errors: any;
    disabled: boolean;
    loading: boolean;
}

function AddProductForm({
    handleSubmit,
    onSubmit,
    control,
    categories,
    brands,
    register,
    characteristics,
    addCharacteristic,
    changeCharacteristic,
    removeCharacteristic,
    errors,
    disabled,
    loading,
}: IAddProductFormProps) {
    return (
        <form
            className="flex w-full flex-col gap-5"
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
                        getOptionLabel={(option) => option.value}
                        onChange={(_, data) => field.onChange(data._id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="category"
                                label="Категория"
                                error={!!errors.category}
                                helperText={errors.category?.message}
                                disabled={disabled}
                            />
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
                        getOptionLabel={(option) => option.value}
                        onChange={(_, data) => field.onChange(data._id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="brand"
                                label="Бренд"
                                error={!!errors.brand}
                                helperText={errors.brand?.message}
                                disabled={disabled}
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
                        id="title"
                        label="Название"
                        variant="outlined"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        disabled={disabled}
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="description"
                        label="Описание"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        disabled={disabled}
                    />
                )}
            />

            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="price"
                        label="Цена"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        disabled={disabled}
                    />
                )}
            />

            <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="inStock"
                        label="В наличии"
                        error={!!errors.inStock}
                        helperText={errors.inStock?.message}
                        disabled={disabled}
                    />
                )}
            />

            <input
                {...register('images')}
                id="images"
                placeholder="Выберите изображения"
                type="file"
                multiple
                accept="image/*"
                required={true}
                disabled={disabled}
            />

            {errors.images && <p>{errors.images.message}</p>}

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
                        disabled={disabled}
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
                        disabled={disabled}
                    />

                    <Button
                        disabled={disabled}
                        onClick={() => removeCharacteristic(i.number)}
                    >
                        Удалить
                    </Button>
                </Stack>
            ))}

            <LoadingButton
                type="submit"
                loading={loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="outlined"
                color="success"
                fullWidth
                className="mb-3 dark:bg-neutral-700"
            >
                <span>Добавить товар</span>
            </LoadingButton>
        </form>
    );
}

export default AddProductForm;
