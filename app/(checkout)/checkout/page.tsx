import { CartSidebar, CheckoutItem, Container, Title, WhiteBlock } from "@/components/shared";
import { Input, Textarea } from "@/components/ui";

export default function CheckoutPage() {
    return <Container className="mt-10">
        <Title text='Оформление заказа' className="font-extrabold mb-8" />

        <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
                <WhiteBlock title="1. Корзина">
                    <div className="flex col gap-5">

                        {/* <CheckoutItem /> */}
                    </div>

                </WhiteBlock>

                <WhiteBlock title="2. Персональные данные ">
                    <div className="grid grid-cols-2 gap-5">
                        <Input name="firstName" className="text-base" placeholder="Имя" />
                        <Input name="lastName" className="text-base" placeholder="Фамилия" />
                        <Input name="email" className="text-base" placeholder="E-Mail" />
                        <Input name="phone" className="text-base" placeholder="Телефон" />
                    </div>
                </WhiteBlock>

                <WhiteBlock title="3. Адресс доставки ">
                    <div className="flex flex-col gap-5">
                        <Input name="firstName" className="text-base" placeholder="Имя" />

                        <Textarea
                            className="text-base"
                            placeholder="Комментарий к заказу"
                            rows={5}
                        />
                    </div>
                </WhiteBlock>
            </div>

            <div className="w-[450px]">
                <CartSidebar
                    totalAmount={4}
                    vatPrice={4}
                    totalPrice={7000}
                    deliveryPrice={6666}
                    submitting={false}
                />
            </div>
        </div>
    </Container>
}