import { formatPrice } from '@/utils/format-price';
import { IProductCartInCart } from '@/store/CartStore';
import OrderTableItem from '@/components/Cart/OrderTable/OrderTableItem';
import { observer } from 'mobx-react-lite';
import { totalPrice } from '@/utils/total-price';
import { Button } from '@mui/material';

const OrderTable = observer(({ cart }: { cart: IProductCartInCart[] }) => {
    return (
        <section className="mx-auto mt-2 basis-5/6 xl:mt-0 xl:w-1/4 xl:basis-1/4">
            <div className="rounded bg-gray-100 dark:bg-neutral-800">
                <div className="p-5">
                    {cart.map((product, index) => (
                        <OrderTableItem key={index} product={product} />
                    ))}
                    <div className="mt-3 flex justify-between font-bold">
                        <p>Всего к оплате:</p>
                        <p>{formatPrice.format(totalPrice(cart))}</p>
                    </div>
                    <div className="mt-5">
                        <Button variant="outlined" fullWidth>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default OrderTable;
