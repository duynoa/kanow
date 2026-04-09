import type { Metadata } from 'next'
import LayoutContainer from '@/components/layout/LayoutContainer';
import Script from 'next/script';
import { Be_Vietnam_Pro } from 'next/font/google';
import GoogleAnalytics from '@/components/script/GoogleAnalytics';
import GoogleTagManager from '@/components/script/GoogleTagManager';

export const metadata: Metadata = {
    title: 'Kanow - Thuê Xe Tự Lái Và Tài Xế Lái Xe Hộ',
    description: 'Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.',

    verification: {
        google: 'kYhsP0l8f2t9zPrtYTkNEOMEmkw2I64qUM8oGiez5X0',
    },
}

const inter = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap'
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            {/* Google Tag Manager */}
            <Script id="google-tag-manager-head" strategy="beforeInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5QK2CQ7');`}
            </Script>

            <body className={`${inter.className}`}>
                <GoogleTagManager />

                <LayoutContainer>
                    {children}
                </LayoutContainer>

                <GoogleAnalytics gtag='G-Q08PSYRD7Y' />

                <Script
                    id="schema-localbusiness"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "localbusiness",
                            "name": "Kanow - Thuê Xe Tự Lái Và Tài Xế Lái Xe Hộ",
                            "alternateName": "Kanow",
                            "@id": "https://kanow.vn/",
                            "logo": "https://kanow.vn/_next/image?url=%2Flogo%2Flogo_kanow.svg&w=828&q=75",
                            "image": "https://kanow.vn/_next/image?url=%2Flogo%2Flogo_kanow.svg&w=828&q=75",
                            "description": "KANOW là nền tảng tiên phong cung cấp dịch vụ cho thuê xe tự lái, xe có tài xế lái xe hộ và tìm tài xế nhanh chóng, tiện lợi. Với sứ mệnh mang đến trải nghiệm di chuyển an toàn, tối ưu và đáng tin cậy, KANOW không chỉ là một giải pháp vận chuyển mà còn là người bạn đồng hành lý tưởng trên mọi chuyến đi, từ công việc đến du lịch.",
                            "hasMap": "https://maps.app.goo.gl/okzfjybxfa9CwkVg6",
                            "url": "https://kanow.vn/",
                            "telephone": "0833698698",
                            "priceRange": "100000VND-100000000VND",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "84 Đ. Tôn Thất Tùng, Phường Phạm Ngũ Lão, Quận 1, Hồ Chí Minh",
                                "addressLocality": "Quận 1",
                                "addressRegion": "Hồ Chí Minh",
                                "postalCode": "700000",
                                "addressCountry": "VN"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 10.769316538027628,
                                "longitude": 106.68982541849626
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday"
                                ],
                                "opens": "00:00",
                                "closes": "23:59"
                            },
                            "sameAs": [
                                "https://www.facebook.com/kanowvn/",
                                "https://x.com/kanowvn",
                                "https://www.linkedin.com/in/kanowvn/",
                                "https://www.pinterest.com/kanowvn/",
                                "https://vimeo.com/kanowvn",
                                "https://www.reddit.com/user/kanowvn",
                                "https://kanowvn.blogspot.com/",
                                "https://kanowvn.tumblr.com/",
                                "https://www.behance.net/kanowvn",
                                "https://about.me/kanowvn/"
                            ]
                        })
                    }}
                />

                <Script
                    id="schema-person"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Person",
                            "name": "Nguyễn Thị Phương Duy",
                            "url": "https://ceophuongduy.wordpress.com/",
                            "sameAs": [
                                "https://twitter.com/ceophuongduy",
                                "https://www.pinterest.com/ceophuongduy/",
                                "https://www.twitch.tv/ceophuongduy",
                                "https://sketchfab.com/ceophuongduy",
                                "https://www.youtube.com/@ceophuongduy/about",
                                "https://www.tumblr.com/ceophuongduy",
                                "https://sites.google.com/view/ceophuongduy/",
                                "https://about.me/ceophuongduy/",
                                "https://www.linkedin.com/in/ceophuongduy/"
                            ],
                            "jobTitle": "Ceo Kanow",
                            "worksFor": {
                                "@type": "Organization",
                                "name": "Ceo"
                            },
                            "memberOf": {
                                "@type": "Corporation",
                                "name": "Kanow"
                            }
                        })
                    }}
                />

                <Script
                    id="schema-breadcrumb"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "item": { "@id": "https://kanow.vn/", "name": "Trang chủ" }
                            },
                            {
                                "@type": "ListItem", "position": 2, "item": {
                                    "@id": "https://kanow.vn/about-us",
                                    "name": "✅"
                                }
                            }]
                        })
                    }}
                />
            </body>
        </html>
    )
}
