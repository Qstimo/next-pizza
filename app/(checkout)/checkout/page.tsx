'use client'

import { CartSidebar, CheckoutItem, Container, Title } from "@/components/shared";

import { useCart } from "@/shared/hooks";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutAddressForm, CheckoutPersonalForm } from "@/components/shared/checkout";
import { checkoutFormSchema, TCheckoutFormValues } from "@/components/shared/schemas/checkout-form-schema";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/api/actions";
import toast from "react-hot-toast";
import { useState } from "react";


const VAT = 15
const DELIVERY_PRICE = 250

export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState(false)
    const {
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
        loading
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

    const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data) => {

        try {
            setSubmitting(true)
            const url = await createOrder(data)

            toast.success('Заказ успешно оформлен! Переход на страницу оплаты')
            if (url) {
                location.href = url
            }
        } catch (error) {
            console.log(error)
            toast.error('Не удалось создать заказ')
        } finally{
            setSubmitting(false)
        }
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
                            loading={loading}
                        />

                        <CheckoutPersonalForm className={cn({ 'opacity-40 pointer-events-none': loading })} />

                        <CheckoutAddressForm className={cn({ 'opacity-40 pointer-events-none': loading })} />


                    </div>

                    <div className="w-[450px]">
                        <CartSidebar
                            totalAmount={totalAmount}
                            vatPrice={vatPrice}
                            totalPrice={totalPrice}
                            deliveryPrice={DELIVERY_PRICE}
                            // submitting={submitting}
                            loading={loading || submitting}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    </Container >
}