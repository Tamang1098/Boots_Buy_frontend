import axios from"../api"

export const getAllBrandApi= () => axios.get("/admin/brand")

export const createOneBrandApi= (data) =>
    axios.post("/admin/brand",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    )  //request using multer/file upload