'use client'

import { CartSidebar, CheckoutItem, Container, Title } from "@/components/shared";

import { useCart } from "@/shared/hooks";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutAddressForm, CheckoutPersonalForm } from "@/components/shared/checkout";
import { checkoutFormSchema, TCheckoutFormValues } from "@/components/shared/schemas/checkout-form-schema";


const VAT = 15
const DELIVERY_PRICE = 250
export default function CheckoutPage() {
    const {
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
    } = useCart()


    const form = useForm<TCheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',

        }
    })


    const vatPrice = (totalAmount * VAT) / 100
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

    const onSubmit:SubmitHandler<TCheckoutFormValues> = (data)=>{

    }

    return <Container className="mt-10">
        <Title text='Оформление заказа' className="font-extrabold mb-8" />

        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-10 flex-1 mb-20">
                        <CheckoutCart
                            items={items}
                            updateItemQuantity={updateItemQuantity}
                            removeCartItem={removeCartItem}
                        />

                        <CheckoutPersonalForm />

                        <CheckoutAddressForm />


                    </div>

                    <div className="w-[450px]">
                        <CartSidebar
                            totalAmount={totalAmount}
                            vatPrice={vatPrice}
                            totalPrice={totalPrice}
                            deliveryPrice={DELIVERY_PRICE}
                            submitting={false}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    </Container >
}