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
    price: number
    loading: boolean
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
    price,
    loading
}) => {

    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage hasCircle={false} imageUrl={imageUrl} size={30} />

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />


                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={() => onClickAdd?.()}
                    loading={loading}
                >
                    Добавить в корзину за {price} ₽
                </Button>


            </div>


        </div >)

}