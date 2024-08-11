import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"
import { Ingridient } from "@prisma/client"

export const getAll = async (): Promise<Ingridient[]> => {
    return (await axiosInstance.get<Ingridient[]>(ApiRoutes.INGREDIENTS)).data

}