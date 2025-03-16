import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount"
import { CartItemDTO } from "../services/dto/cart.dto"

export const updateCartUserAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingridients: true
                }
            }
        }
    })

    if (!userCart) {
        return
    }

    const totalAmount = userCart?.items.reduce((acc, item) => {
        return acc + calcCartItemTotalAmount(item as unknown as CartItemDTO)
    }, 0)

    return await prisma.cart.update({
        where: {
             id: userCart.id
        },
        data: {
            totalAmount
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingridients: true
                }
            }
        }
    })
}