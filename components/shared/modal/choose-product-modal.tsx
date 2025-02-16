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

interface IProps {
    product: ProductWithRelations
    className?: string

}

export const ChooseProductModal: React.FC<IProps> = ({ product }) => {
    const router = useRouter()
    const isPizzaForm = Boolean(product.items[0].pizzaType)

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
                {isPizzaForm
                    ? <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        items={product.categoryId}
                        name={product.name}
                        ingredients={product.createdAt} />

                    : <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}/>
                }
            </DialogContent>
        </Dialog>
    );
};