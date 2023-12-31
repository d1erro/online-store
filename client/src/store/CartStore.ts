import { makeAutoObservable } from 'mobx';

export interface IProductCartInCart {
    id: string;
    price: number;
    count: number;
}

class CartStore {
    cart: IProductCartInCart[] | [] = [];
    count = 1;

    constructor() {
        makeAutoObservable(this);
    }

    incrementGlobalCount(productId: string, max: number) {
        const productInCart = this.cart.find((item) => item.id === productId);
        if (productInCart?.count !== max) if (this.count !== max) this.count++;
    }

    decrementGlobalCount() {
        if (this.count > 1) this.count--;
    }

    incrementProductCount(productId: string, max: number) {
        const currentProduct = this.cart.find((item) => item.id === productId);

        if (currentProduct && currentProduct.count !== max) {
            currentProduct.count++;
        }
        if (currentProduct && currentProduct.count > max) {
            currentProduct.count = max;
        }
        this.saveCartToLocalStorage();
    }

    decrementProductCount(productId: string) {
        const currentProduct = this.cart.find((item) => item.id === productId);
        if (currentProduct && currentProduct.count > 1) currentProduct.count--;
        this.saveCartToLocalStorage();
    }

    removeProduct(productId: string) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCartToLocalStorage();
    }

    loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    }

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addProduct(newProduct: IProductCartInCart, max: number) {
        const productInCart = this.cart.find(
            (item) => item.id === newProduct.id,
        );
        if (!productInCart) this.cart = [...this.cart, newProduct];
        if (productInCart && productInCart.count !== max) {
            productInCart.count += newProduct.count;
            this.count = 1;
        }
        this.saveCartToLocalStorage();
    }
}

const cartStore = new CartStore();

export default cartStore;
