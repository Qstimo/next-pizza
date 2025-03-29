'use client'

import { useCartStore } from '@/shared/store'
import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'
import { ProductWithRelations } from "@/@types/prisma"


export const ProductForm: FC<{ product: ProductWithRelations, _onSubmit?: VoidFunction }> = ({ product, _onSubmit }) => {
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(product.items[0].pizzaType)

    const [loading, addCartItem] = useCartStore(state => [state.loading, state.addCartItem])


    const onSubmit = async (productItemId?: number, ingridients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id

            await addCartItem({
                productItemId: itemId,
                ingridients,
            })

            _onSubmit?.()
            toast.success(`${product.name} добавлен в корзину`)

        } catch (error) {
            toast.error('Не удалось добавить товар в корзину')
            console.log(error)
        }

    }
    return (
        <>
            {isPizzaForm
                ? <ChoosePizzaForm
                    imageUrl={product.imageUrl}
                    items={product.items}
                    name={product.name}
                    onClickAddCart={onSubmit}
                    ingredients={product.ingridients}
                    loading={loading}
                />

                : <ChooseProductForm
                    imageUrl={product.imageUrl}
                    onClickAdd={onSubmit}
                    name={product.name}
                    price={firstItem.price}
                    loading={loading}
                />
            }</>
    )
}

