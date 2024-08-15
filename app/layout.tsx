import type { Metadata } from 'next'
import LayoutContainer from '@/components/layout/LayoutContainer';

export const metadata: Metadata = {
    title: 'Kanow - Trang chủ',
    description: 'Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta name="google-site-verification" content="ig4H1SE4hArs-pmvzmAmlMSVutXaQoJ3yB5UfRUiO_s" />
                {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> */}

            </head>

            <LayoutContainer>
                {children}
            </LayoutContainer>
        </html>
    )
}
