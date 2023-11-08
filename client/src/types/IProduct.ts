export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    inStock: number;
    characteristics: {
        title: string;
        value: string;
    }[];
    category: {
        _id: string;
        value: string;
    };
    brand: {
        _id: string;
        value: string;
    };
    images: string[];
}
