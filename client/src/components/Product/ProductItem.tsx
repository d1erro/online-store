import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/Product/IProduct';
import { formatPrice } from '@/utils/format-price';

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <Link href={'/products/' + product._id}>
            <div className="border p-3 rounded gap-5">
                <div className="mb-5 mx-auto flex justify-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0]}`}
                        alt={product.title}
                        width={300}
                        height={300}
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 truncate overflow-ellipsis">
                    {product.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatPrice.format(product.price)}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;
