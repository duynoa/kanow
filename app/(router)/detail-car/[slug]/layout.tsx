import { getDataDetailCar } from '@/services/cars/cars.services';
import moment from 'moment';
import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from 'react';

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '');
}

interface LayoutProps {
    children: ReactNode;
    params: { slug: string }; // Thêm params nếu cần
}

export async function generateMetadata({ params }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const today = new Date()
        let dataParams = {
            // car_id: params.slug,
            // type: (typeCarDetail === "1" || typeCarDetail === "2") ? parseInt(typeCarDetail) : null,
            date_search: `${moment(today).format("DD/MM/YYYY HH:mm:ss")} - ${moment(today).format("DD/MM/YYYY HH:mm:ss")}`,
        }

        const { data } = await getDataDetailCar(params.slug, dataParams);

        console.log('sdsada', data);

        const car = data.data;
        const previousImages = (await parent).openGraph?.images || []
        // Sử dụng hàm stripHtml để loại bỏ thẻ HTML trong mô tả
        const description = stripHtml(car.detail || 'No description available');

        return {
            title: car.name,
            description: description || 'No description available',
            openGraph: {
                title: car.name,
                description: description || 'No description available',
                images: [
                    {
                        url: `${data.base.base}/${car?.image_car_detail[0]?.name}`, // Replace with the actual image URL field
                        alt: car.name,
                    },
                    ...previousImages
                ],
            },
            twitter: {
                title: car.name,
                description: description || 'No description available',
                images: [
                    `${data.base.base}/${car?.image_car_detail[0]?.name}`, // Replace with the actual image URL field
                ],
                card: "summary_large_image",
            },

        };
    } catch (error) {
        console.error('Error fetching product details:', error);
        return {
            title: 'Product not found',
            description: 'The requested product could not be found.',
            openGraph: {
                title: 'Product not found',
                description: 'The requested product could not be found.',
                images: [],
            },
            twitter: {
                title: 'Product not found',
                description: 'The requested product could not be found.',
                images: [],
                card: 'summary_large_image',
            },
        };
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
