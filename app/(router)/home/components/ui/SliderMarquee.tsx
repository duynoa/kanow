import Image from 'next/image';
import React, { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

interface MarqueeItem {
    id: number;
    file_name: string;
}

interface SkewedMarqueeProps {
    dataMarque: any[];
}

const SliderMarquee: React.FC<SkewedMarqueeProps> = ({ dataMarque }) => {
    // Lấy 4 mục đầu cho dòng thứ nhất và 3 mục tiếp theo cho dòng thứ hai
    const firstRowItems = useMemo(() => dataMarque.slice(0, 6), [dataMarque]);
    const secondRowItems = useMemo(() => dataMarque.slice(6), [dataMarque]);

    return (
        <div className="space-y-8"> {/* Tạo khoảng cách giữa hai dòng */}
            {/* Dòng thứ nhất với 4 mục */}
            <Marquee
                speed={30}
                pauseOnHover
                autoFill
                gradient={false}
            >
                {
                    firstRowItems.map((item) => (
                        <div key={item.id} className="3xl:w-[360px] md:w-[300px] w-[240px] aspect-square lg:mx-4 mx-2">
                            <Image
                                width={800}
                                height={800}
                                alt="feedback"
                                src={item.image}
                                loading="lazy"
                                className='size-full object-cover aspect-square rounded-md'
                            />
                        </div>
                    ))
                }
            </Marquee>

            {/* Dòng thứ hai với 3 mục, chạy song song với dòng trên */}
            <Marquee
                speed={30}
                pauseOnHover
                direction='right'
                autoFill
                gradient={false}
            >
                {
                    secondRowItems.map((item) => (
                        <div key={item.id} className="3xl:w-[360px] md:w-[300px] w-[240px] aspect-square lg:mx-4 mx-2">
                            <Image
                                width={800}
                                height={800}
                                alt="feedback"
                                src={item.image}
                                loading="lazy"
                                className='size-full object-cover aspect-square rounded-md'
                            />
                        </div>
                    ))
                }
            </Marquee>
        </div>
    );
};

export default React.memo(SliderMarquee);
