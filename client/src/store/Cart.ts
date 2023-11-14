import { autorun, makeAutoObservable } from 'mobx';

export interface IProductCartInCart {
    id: string;
    count: number;
}

class Cart {
    cart: IProductCartInCart[] | [] = [];
    count = 1;

    constructor() {
        makeAutoObservable(this);
        this.loadCartFromLocalStorage();
        autorun(() => this.saveCartToLocalStorage());
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
    }

    decrementProductCount(productId: string) {
        const currentProduct = this.cart.find((item) => item.id === productId);
        if (currentProduct && currentProduct.count > 0) currentProduct.count--;
        if (currentProduct && currentProduct.count === 0) {
            this.removeProduct(productId);
        }
    }

    removeProduct(productId: string) {
        this.cart = this.cart.filter((item) => item.id !== productId);
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
    }
}
export default new Cart();
