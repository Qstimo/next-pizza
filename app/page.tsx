import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";


export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="pb-14">
        <div className="flex gap-[60px] mt-10">
          <div className="w-[250px]">
            <Filters/>
          </div>

          <div className="flex flex-col gap-16">

            {/* <ProductsGroupList categoryId={1}  title="Пиццы" items={[1, 2, 3, 4, 5]} /> */}
            {/* <ProductsGroupList  tittle="Комбо" items={[1, 2, 3, 4, 5]} /> */}
        
          </div>
        </div>

      </Container>
    </>
  );
}
