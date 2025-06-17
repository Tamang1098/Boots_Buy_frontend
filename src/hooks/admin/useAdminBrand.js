import {  useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createOneBrandService, getAllBrandService } from "../../services/brandService";
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