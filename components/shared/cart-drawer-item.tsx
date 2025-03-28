import { cn } from '@/shared/lib/utils';
import React from 'react';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
    className?: string;
    onClickCountButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void
}

export const CartDrawerItem: React.FC<Props> = ({
    id,
    imageUrl,
    name,
    price,
    quantity,
    className,
    details,
    onClickRemove,
    onClickCountButton,
    disabled
}) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', { 'opacity-50 pointer-events-none': disabled }, className)}>
            <CartItem.Image src={imageUrl} />
            <div className='flex-1'>
                <CartItem.Info name={name} details={details} />
                <hr className='my-3' />

                <div className='flex items-center justify-between'>
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    <div>
                        <CartItem.Price value={price} />
                        <Trash2Icon onClick={onClickRemove} className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};