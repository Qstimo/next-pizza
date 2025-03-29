import { useEffect } from "react"
import { Filters } from "./use-filters"
import QueryString from "qs"
import { useRouter } from "next/navigation"
import { useDeepCompareEffect } from "react-use"

export const useQueryFilters =(filters:Filters)=>{
    const router = useRouter()

    useDeepCompareEffect(() => {
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingridients: Array.from(filters.selectedIngredients),
        }

        const query = QueryString.stringify(params, {
            arrayFormat: 'comma'
        })

        router.push(`?${query}`, { scroll: false })

    }, [filters])


}