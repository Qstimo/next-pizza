'use server'

import { PayOrderTemplate } from '@/components/shared/email-templates';
import { TCheckoutFormValues } from '@/components/shared/schemas/checkout-form-schema';
import { prisma } from '@/prisma/prisma-client';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';


export async function createOrder(data: TCheckoutFormValues) {
    try {
        //   const currentUser = await getUserSession();
        //   const userId = Number(currentUser?.id);
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            return
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingridients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken
            }
        });

        if (!userCart?.totalAmount) {
            return;
        }

        if (!userCart) {
            throw new Error('Cart not found');
        }



        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });


        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });



        const paymentData = await createPayment({
            orderId: order.id,
            amount: order.totalAmount,
            description: `Заказ #${order.id}`,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');

        }
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const orderLink = paymentData.confirmation.confirmation_url

        await sendEmail(data.email, `Next Pizza / Оплатите заказ #${order?.id}`, PayOrderTemplate(
            { orderId: order.id, orderLink, totalAmount: order.totalAmount }
        ));

        return orderLink
    } catch (error) {
        console.log('[CART_CHECKOUT_POST] Server error', error);
        throw error;
    }
}