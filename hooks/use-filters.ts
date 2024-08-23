import { useSearchParams } from "next/navigation"
import { useSet } from "react-use"
import { useState } from "react"
interface PriceProps {
    priceFrom?: number,
    priceTo?: number
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string,
    sizes: string,
    ingredients: string,
}

export interface Filters {
    sizes: Set<string>,
    pizzaTypes: Set<string>,
    selectedIngredients: Set<string>,
    prices: PriceProps

}

interface ReturnProps extends Filters {
    setPrice: (name: keyof PriceProps, value: number) => void,
    setPizzaTypes: (value: string) => void,
    setPizzaSizes: (value: string) => void,
    setSelectedIngredients: (value: string) => void,
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>


    const [selectedIngredients, { toggle: togleIngredients }] =
        useSet(new Set<string>(searchParams.has("ingredients") ? searchParams.get('ingredients')?.split(',') : []))

    const [sizes, { toggle: toggleSizes }] =
        useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []))

    const [pizzaTypes, { toggle: togglePizzaTypes }] =
        useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))

    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || 0,
        priceTo: Number(searchParams.get('priceTo')) || 0
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrice: updatePrice,
        setPizzaSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setSelectedIngredients: togleIngredients
    }
}