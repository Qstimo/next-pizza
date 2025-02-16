import { Api } from "@/shared/services/api-client"
import { Ingridient } from "@prisma/client"
import { useEffect, useState } from "react"

export const useIngredients = () => {
    const [ingridients, setIngridients] = useState<Ingridient[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchIngredients() {
            try {
                setLoading(true)
                const res = await Api.ingredients.getAll()
                setIngridients(res)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        fetchIngredients()
    }, [])

    return { ingridients, loading }
}