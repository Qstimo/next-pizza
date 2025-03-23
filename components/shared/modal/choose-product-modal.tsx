'use client'
import { Dialog } from '@/components/ui';
import React from 'react';
import { Product } from '@prisma/client';
import { DialogContent } from '@/components/ui/dialog';
import { Title } from '../title';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface IProps {
    product: ProductWithRelations
    className?: string

}

export const ChooseProductModal: React.FC<IProps> = ({ product }) => {
    const router = useRouter()
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


            toast.success(`${product.name} добавлен в корзину`)
            router.back()

        } catch (error) {
            toast.error('Не удалось добавить товар в корзину')
            console.log(error)
        }

    }


    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
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
                }
            </DialogContent>
        </Dialog>
    );
};