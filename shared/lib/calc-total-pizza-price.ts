import { Ingridient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"


/**
 * 
 * @param type 
 * @param size 
 * @param items 
 * @param ingredients 
 * @param selectedIngredients 
 * @returns 
 */
export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingridient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0
    const totalIngredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0)

    return pizzaPrice + totalIngredientsPrice
}