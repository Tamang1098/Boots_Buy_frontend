import {  useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createOneBrandService, getAllBrandService,getOneBrandService,updateOneBrandService } from "../../services/brandService";
import { toast } from "react-toastify";

export const useAdminBrand = () => {
    const query = useQuery(
        {
            queryKey: ["admin_brand"],
            queryFn: () => getAllBrandService()
        }
    )
    const brands = query.data?.data || []
    return {
        ...query, brands
    }
}

export const useCreateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneBrandService,
        onSuccess: () => {
            toast.success("brand created")
            queryClient
                .invalidateQueries(["admin_brand"])

            //refetch with the key
        },
        onError: (err) => {
            toast.error(err.message || "failed")
        }
    })
}



export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneCategoryService,
        onSuccess: () => {
            toast.success("Category created")
            queryClient
                .invalidateQueries(["admin_category"])
            // refetch with the key
        },
        onError: (err) => {
            toast.error(err.message || "Failed")
        }
    })
}

export const useGetOneBrand = (id) => {
    const query = useQuery(
        {
            queryKey: ["admin_brand_detail"],
            queryFn: () => getOneBrandService(id),
            enabled: !!id, 
            retry: false // default 3 retries
        }
    )
    const brand = query.data?.data || {}
    return {
        ...query, brand
    }
}
// id = "123" -> !!id true
// id = undefined, id = null -> !!id false
export const useUpdateOneBrand = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id, data}) => 
                updateOneBrandService(id, data),
            onSuccess: () => {
                toast.success("Brand updated")
                queryClient.invalidateQueries(["admin_brand"])
            },
            onError: (err)=> {
                toast.error(err. message || "Failed to update")
            }
        }
    )
}