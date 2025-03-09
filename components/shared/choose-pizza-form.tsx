'use client'
import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { ProductImage } from "./product-image";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingridient } from "@prisma/client";
import { IngredientItem } from "./ingredient";
import { useSet } from "react-use";
import { ProductWithRelations } from "@/@types/prisma";
import { calcTotalPizzaPrice, getAviablePizzaSizes } from "@/shared/lib";
import { usePizzaOption } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingridient[];
    items: ProductWithRelations['items'];
    onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className,
}) => {

    const { type, size, selectedIngredients, availableSizes, addIngredient, setSize, setType } = usePizzaOption(items)
    const { totalPrice, textDetaills } = getPizzaDetails(
        type,
        size,
        items,
        ingredients,
        selectedIngredients)

    const handleClickAdd = () => {
        onClickAddCart?.()
    }


    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-2 mt-2">
                    <GroupVariants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
                    <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />

                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients?.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={handleClickAdd}
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>


            </div>


        </div >)

}