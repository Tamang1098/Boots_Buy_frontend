import {getAllBrandApi,createOneBrandApi} from "../api/admin/brandApi"

export const getAllBrandService= async() =>{
    try{
        const response = await getAllBrandApi()
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"Failed to fetch"}
    }
}

export  const createOneBrandService= async (data) =>{
    try{
        const response = await createOneBrandApi(data)
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"failed to create"}
    }
}