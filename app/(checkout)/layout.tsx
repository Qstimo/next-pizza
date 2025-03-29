import { Header } from "@/components/shared"

export const metadata = {
    title: 'Next.js | Cart',
    description: 'Generated by Next.js',
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-[#f4f1ee]">
            <Header className="border-b-gray-200" hasCart={false} hasSearch={false} />
            {children}
        </main>

    )
}
