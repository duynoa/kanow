import type { Metadata } from 'next'
import LayoutContainer from '@/components/layout/LayoutContainer';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Kanow - Thuê Xe Tự Lái Và Tài Xế Lái Xe Hộ',
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
                <meta name="google-site-verification" content="kYhsP0l8f2t9zPrtYTkNEOMEmkw2I64qUM8oGiez5X0" />
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=G-Q08PSYRD7Y`}
                    strategy="afterInteractive" // Chạy script sau khi tải trang
                />

                <Script id="google-analytics" strategy="afterInteractive">
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
           gtag('config', 'G-Q08PSYRD7Y'); 
        `}
                </Script>
            </head>

            <LayoutContainer>
                {children}
            </LayoutContainer>
        </html>
    )
}
