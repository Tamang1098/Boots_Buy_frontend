import axios from"../api"

export const getAllBrandApi= () => axios.get("/admin/brand")

export const createOneBrandApi= (data) =>
    axios.post("/admin/brand",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
)  //request using multer/file upload

export const getOneBrandApi = (id) => 
    axios.get("/admin/brand/" + id)

export const updateOneBrandApi = (id, data) =>
    axios.put("/admin/brand/" + id, data, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    }
)