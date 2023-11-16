'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

import { Pagination, Navigation } from 'swiper/modules';

export default function ImagesSwiper({ images }: { images: string[] }) {
    return (
        <Swiper
            style={{
                // @ts-ignore
                '--swiper-navigation-color': '#000000',
                '--swiper-pagination-color': '#000000',
                //borderRadius: '15px',
            }}
            lazy="false"
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {images.map((image, i) => (
                <SwiperSlide key={i} className="select-none">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                        alt=""
                        width={1000}
                        height={1000}
                        priority
                        className="rounded"
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
