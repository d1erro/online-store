import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/Product/IProduct';
import { formatPrice } from '@/utils/format-price';

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <Link href={'/products/' + product._id}>
            <div className="group relative gap-5 overflow-hidden rounded border border-neutral-300 bg-white p-3 dark:border-neutral-700 dark:bg-inherit">
                <div className="mb-5 flex justify-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.images[0]}`}
                        alt={product.title}
                        width={300}
                        height={300}
                        priority
                        className="rounded duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 duration-300 group-hover:opacity-10 dark:bg-white"></div>
                </div>
                <h3 className="mt-4 truncate overflow-ellipsis text-sm dark:text-neutral-300">
                    {product.title}
                </h3>
                <p className="text-lg font-bold dark:text-neutral-300">
                    {formatPrice.format(product.price)}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;
