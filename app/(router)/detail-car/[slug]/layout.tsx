import { getDataDetailCar } from '@/services/cars/cars.services';
import moment from 'moment';
import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from 'react';
import he from 'he';

function stripHtml(html: string): string {
    // Bước 1: Loại bỏ các thẻ HTML bằng regex
    const plainText = html.replace(/<[^>]*>/g, '');

    // Giải mã các thực thể HTML
    const decodedString = he.decode(plainText);

    return decodedString;
}

interface LayoutProps {
    children: ReactNode;
    params: { slug: string }; // Thêm params nếu cần
}

export async function generateMetadata({ params }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const today = new Date()
        const tomorrow = today.setDate(today.getDate() + 1)
        let dataParams = {
            type: 1,
            date_search: `${moment(today).format("DD/MM/YYYY HH:mm:ss")} - ${moment(tomorrow).format("DD/MM/YYYY HH:mm:ss")}`,
        }

        const { data } = await getDataDetailCar(params.slug, dataParams);

        const previousImages = (await parent).openGraph?.images || []
        // Sử dụng hàm stripHtml để loại bỏ thẻ HTML trong mô tả
        const description = stripHtml(data.data.detail || 'No description available');

        return {
            title: data.data.name,
            description: description || 'No description available',
            openGraph: {
                title: data.data.name,
                description: description || 'No description available',
                images: [
                    {
                        url: `${data.base.base}/${data.data?.image_car_detail[0]?.name}`, // Replace with the actual image URL field
                        alt: data.data.name,
                    },
                    ...previousImages
                ],
            },
            twitter: {
                title: data.data.name,
                description: description || 'No description available',
                images: [
                    `${data.base.base}/${data.data?.image_car_detail[0]?.name}`, // Replace with the actual image URL field
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
