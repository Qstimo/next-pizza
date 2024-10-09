import { Container, Title } from "@/components/shared"
import { GroupVariants } from "@/components/shared/group-variants"
import { ProductImage } from "@/components/shared/product-image"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } })

    if (!product) return notFound()

    return (<Container className="flex flex-col my-10">
        <div className="flex flex-1">
            <ProductImage className="relative" imageUrl={product.imageUrl} size={40} />
            <div className="w-[490px] bg-[#efecec6d] p-7 rounded-sm">
                <Title text={product.name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eos beatae a, error numquam suscipit consequuntur asperiores. Molestiae qui quaerat temporibus recusandae. A nostrum ipsum quam sequi, labore repudiandae ab?
                </p>
                <GroupVariants             
                items={[
                    {
                        name: 'Маленькая',
                        value: "1",
                    },
                    {
                        name: 'Средняя',
                        value: "2",
                    },
                    {
                        name: 'Большая',
                        value: "3",
                    }
                ]} />
            </div>
        </div>
    </Container>)
}