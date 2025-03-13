import { getDetailNewsEvents } from '@/services/blog/blog.services';
import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from 'react';

// export const metadata: Metadata = {
//     title: 'Kanow - Chi tiết Tin tức & Hoạt động',
//     description: 'Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.',
// }

interface LayoutProps {
    children: ReactNode;
    params: { slug: string }; // Thêm params nếu cần
}

export async function generateMetadata({ params }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const { data } = await getDetailNewsEvents(params.slug);

        const previousImages = (await parent).openGraph?.images || []

        // Tạo URL tuyệt đối và chính xác cho trang chi tiết sản phẩm
        const productUrl = `https://system.kanow.vn/api/blog/getDetail/${params.slug}`;

        // Đảm bảo URL ảnh là tuyệt đối
        const productImageURL = data?.data?.image.startsWith("http")
            ? data?.data?.image
            : `https://system.kanow.vn${data?.data?.image}`;

        return {
            title: `Kanow - ${data?.data?.title}`,
            description: "Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.",
            openGraph: {
                title: `Kanow - ${data?.data?.title}`,
                description: "Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.",
                type: "website",
                url: productUrl,
                siteName: "Kanow",
                images: [
                    {
                        url: data?.data?.image, // Replace with the actual image URL field
                        alt: "image",
                        width: 1200,
                        height: 630,
                    },
                    // ...previousImages
                ],
            },
            twitter: {
                title: `Kanow - ${data?.data?.title}`,
                description: "Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.",
                images: [productImageURL],
                card: "summary_large_image",
            },

        };
    } catch (error) {
        console.error('Error fetching News details:', error);
        return {
            title: 'News not found',
            description: 'The requested News could not be found.',
            openGraph: {
                title: 'News not found',
                description: 'The requested News could not be found.',
                images: [],
            },
            twitter: {
                title: 'News not found',
                description: 'The requested News could not be found.',
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
