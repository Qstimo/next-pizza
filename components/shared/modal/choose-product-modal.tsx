'use client'
import { Dialog } from '@/components/ui';
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';

import { ProductForm } from '../product-form';

interface IProps {
    product: ProductWithRelations
    className?: string

}

export const ChooseProductModal: React.FC<IProps> = ({ product }) => {
    const router = useRouter()


    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
                <ProductForm _onSubmit={() => router.back()} product={product} />

            </DialogContent>
        </Dialog>
    );
};