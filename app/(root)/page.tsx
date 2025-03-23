import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";


export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className="pb-14">
        <div className="flex gap-[60px] mt-10">
          <div className="w-[250px]">
            <Suspense>  <Filters /></Suspense>
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
