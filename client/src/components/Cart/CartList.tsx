import CartItem from '@/components/Cart/CartItem';
import { IProductCartInCart } from '@/store/CartStore';
import { observer } from 'mobx-react-lite';

const CartList = observer(({ cart }: { cart: IProductCartInCart[] }) => {
    return (
        <div className="xl:w-3/4">
            <section className="basis-5/6 xl:mr-5 xl:basis-3/4">
                {cart.map(
                    (product, index) =>
                        product.count > 0 && (
                            <CartItem key={index} product={product} />
                        ),
                )}
            </section>
        </div>
    );
});

export default CartList;
