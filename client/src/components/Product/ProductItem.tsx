import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/IProduct';

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <Link href={'/products/' + product._id}>
            <div className="border p-3 rounded">
                <div className="mb-10 w-48 h-56 mx-auto">
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
                    ${product.price}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;
