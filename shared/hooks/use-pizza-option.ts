import { Variant } from "@/components/shared/group-variants";
import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAviablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize,
    type: PizzaType,
    selectedIngredients: Set<number>
    availableSizes: Variant[]
    setSize: (size: PizzaSize) => void,
    setType: (type: PizzaType) => void,
    addIngredient: (id: number) => void,
}
export const usePizzaOption = (
    items: ProductItem[],
): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))
    const availableSizes = getAviablePizzaSizes(type, items)


    useEffect(() => {
        const currentSize = availableSizes?.find(item => Number(item.value) === size)
        const aviableSize = availableSizes?.find(item => !item.disabled)

        if (!currentSize && aviableSize) {
            setSize(Number(aviableSize.value) as PizzaSize)
        }

    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        setSize,
        setType,
        addIngredient
    }
}