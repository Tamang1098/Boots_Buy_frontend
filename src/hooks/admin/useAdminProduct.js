import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createOneProductService,
  getAllProductService,
  getOneProductService,
  updateOneProductService,
  deleteOneProductService,
} from "../../services/admin/productService";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";

export const useAdminProduct = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["admin_product", pageNumber, pageSize, search],
    queryFn: () =>
      getAllProductService({
        page: pageNumber,
        limit: pageSize,
        search: search,
      }),
    keepPreviousData: true,
  });

  const products = query.data?.data || [];
  const pagination = query.data?.pagination || {
    page: 1,
    totalPages: 1,
    limit: 10,
  };

  const canPreviousPage = pagination.page > 1;
  const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canPreviousPage,
    canNextPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOneProductService,
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries(["admin_product"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create product");
    },
  });
};

export const useGetOneProduct = (id) => {
  const query = useQuery({
    queryKey: ["admin_product_detail", id],
    queryFn: () => getOneProductService(id),
    enabled: !!id,
    retry: false,
  });

  const product = query.data?.data || {};

  return {
    ...query,
    product,
  };
};

export const useUpdateOneProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateOneProductService(id, data),
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries(["admin_product"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update product");
    },
  });
};

export const useDeleteOneProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOneProductService,
    mutationKey: ["admin_product_deleted"],
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries(["admin_product"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Delete failed");
    },
  });
};
