import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingridients: true
        }
      }
    }
  })

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter(category=> category.products.length > 0)}/>
      <Container className="pb-14">
        <div className="flex gap-[60px] mt-10">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex flex-col gap-16">
            {categories.map(category => (
              category.products.length > 0 && (
                <ProductsGroupList
                  categoryId={category.id}
                  items={category.products}
                  title={category.name}
                />)
            ))}
          </div>
        </div>

      </Container>
    </>
  );
}
