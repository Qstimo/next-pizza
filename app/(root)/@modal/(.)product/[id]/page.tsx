import { ProductWithRelations } from "@/@types/prisma"
import { ChooseProductModal} from "@/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingridients: true,
            items: true
        }
    })


    if (!product) return notFound()

    return <ChooseProductModal product={product as unknown as ProductWithRelations}/>
}