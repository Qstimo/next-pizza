import { Api } from "@/services/api-client"
import { Ingridient } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSet } from "react-use"

interface ReturnProps {
    ingridients: Ingridient[],
    loading: boolean,
    selectedIds: Set<string>,
    onAddId: (id:string) => void
}
export const useFilterIngedients = (ids?:string[]): ReturnProps => {
    const [ingridients, setIngridients] = useState<Ingridient[]>([])
    const [loading, setLoading] = useState(true)
    const [ selectedIds, { toggle}] = useSet(new Set<string>([]))


    useEffect(() => {

        async function fetchIngredients() {
            try {
                setLoading(true)
                const res = await Api.ingredients.getAll()
                setIngridients(res)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }

        }

        fetchIngredients()
    }, [])

    return { ingridients, loading, onAddId:toggle, selectedIds,  }

}