export interface IProductInfo {
    title: string;
    description: string;
    price: string;
    inStock: string;
    category: string;
    brand: string;
    characteristics: Characteristic[];
    images: FileList;
}

interface Characteristic {
    title: string;
    value: string;
}
