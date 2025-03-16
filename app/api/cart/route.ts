import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ items: [] , totalAmount: 0 })
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

