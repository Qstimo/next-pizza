import React from 'react';
import { WhiteBlock } from './white-block';
import { Button } from '../ui/button';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartSidebarDetails } from './cart-sidebar-details';
import { Skeleton } from '../ui';

interface Props {
  totalAmount: number;
  totalPrice: number;
  vatPrice: number;
  deliveryPrice: number;
  className?: string;
  submitting?: boolean;
  loading: boolean
}

export const CartSidebar: React.FC<Props> = ({
  totalAmount,
  totalPrice,
  vatPrice,
  deliveryPrice,
  className,
  submitting,
  loading
}) => {

  const details = [
    {
      title: <div className='flex items-center'>
        <Package className='mr-2 text-gray-400' />
        Стоимость товаров:
      </div>,
      value: totalAmount
    },
    {
      title: <div className='flex items-center'>
        <Percent className='mr-2 text-gray-400' />
        Налоги:
      </div>,
      value: vatPrice
    },
    {
      title: <div className='flex items-center'>
        <Truck className='mr-2 text-gray-400' />
        Доставка:
      </div>,
      value: deliveryPrice
    },

  ]


  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? <Skeleton className='w-48 h-11' /> : <span className="text-4xl font-extrabold">{totalPrice} ₽</span>}

      </div>


      {details.map((item, i) => <CartSidebarDetails
        key={i} title={item.title}
        value={loading ? <Skeleton className='w-24 h-6 mr-1 rounded-[6px]' /> : item.value}
      />)}



      <Button
        type="submit"
        disabled={!totalAmount || submitting}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
