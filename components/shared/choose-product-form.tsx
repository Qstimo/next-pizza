import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { ProductImage } from "./product-image";
import { Button } from "../ui";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
}) => {
    const totalPrice = 350
    const textDetaills = '245346646'

    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage hasCircle={false} imageUrl={imageUrl} size={30} />

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>


            </div>


        </div >)

}