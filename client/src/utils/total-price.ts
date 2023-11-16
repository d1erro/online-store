import { IProductCartInCart } from '@/store/CartStore';

export const totalPrice = (cart: IProductCartInCart[]) =>
    cart.reduce(
        (sum, product) => sum + Math.ceil(product.price * product.count),
        0,
    );
