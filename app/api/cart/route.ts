import { prisma } from "@/prisma/prisma-client";
import { updateCartUserAmount } from "@/shared/lib";
import { fimdOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValue } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ items: [], totalAmount: 0 })
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token
                    }
                ],
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

        return NextResponse.json(userCart)
    } catch (error) {
        console.log(error)
    }
}


export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value

        if (!token) {
            token = crypto.randomUUID()
        }

        const userCart = await fimdOrCreateCart(token)
        const data = (await req.json()) as CreateCartItemValue

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingridients: { every: { id: { in: data.ingridients } } }

            }
        })

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + data.quantity
                }
            })


        }

        await prisma.cartItem.create({
            data: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                quantity: 1,
                ingridients: { connect: data.ingridients?.map((id) => ({ id })) }
            }
        })

        const updatedUserCart = await updateCartUserAmount(token)

        const resp = NextResponse.json(updatedUserCart)

        resp.cookies.set('cartToken', token)

        return resp


    } catch (error) {
        console.log(error)
    }

}