import {getAllBrandApi,createOneBrandApi,getOneBrandApi,updateOneBrandApi,deleteOneBrandApi} from "../../api/admin/brandApi"

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



export const getOneBrandService = async (id) => {
    try{
        const response = await getOneBrandApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || { "message" : "Get failed"}
    }
}
export const updateOneBrandService = async (id, data)=>{
    try{
        const response = await updateOneBrandApi(id, data)
        return response.data
    }catch(err){
        throw err.response?.data || { "message" : "Update failed"}
    }
}



export const deleteOneBrandService = async (id) => {
    try{
        const response = await deleteOneBrandApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"Deleted failed"}
    }
}