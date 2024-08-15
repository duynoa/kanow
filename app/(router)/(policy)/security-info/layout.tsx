import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kanow - Bảo mật thông tin',
    description: 'Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.',
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
