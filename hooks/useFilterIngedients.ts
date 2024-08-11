import { Api } from "@/services/api-client"
import { Ingridient } from "@prisma/client"
import { useEffect } from "react"

interface ReturnProps{
    items: Ingridient[]
}
export const useFilterIngedients = ():ReturnProps => {
    useEffect(()=>{
        Api.ingredients.getAll
    },[])
}