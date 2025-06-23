import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetOneProduct, useUpdateOneProduct } from "../../hooks/admin/useAdminProduct";
import { useParams } from "react-router-dom";
import { getBackenedImageUrl } from "../../utils/backened-image";
import './UpdateProduct.css'

export default function UpdateProduct() {
  const { id } = useParams();
  const { data: productOne, error, isLoading } = useGetOneProduct(id);

  const updateProduct = useUpdateOneProduct();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large", (value) => !value || value.size <= 5 * 1024 * 1024),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productOne?.data?.name || "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.image) formData.append("image", values.image);

      updateProduct.mutate(
        { id, data: formData },
        {
          onSuccess: () => {
            formik.resetForm();
          },
        }
      );
    },
  });

  if (isLoading) return <div>Loading product...</div>;
  if (error) return <div>Error loading product: {error.message || error.toString()}</div>;

  return (
    <div className="update-product-container">
      <h2 className="update-product-title">Update Product</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>Product Name</label>
        <input
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}

        <label>Product Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) formik.setFieldValue("image", file);
          }}
        />
        {formik.touched.image && formik.errors.image && <div>{formik.errors.image}</div>}

        <div className="image-preview">
          {formik.values.image ? (
            <img src={URL.createObjectURL(formik.values.image)} alt="Preview" width={200} />
          ) : productOne?.data?.filepath ? (
            <img src={getBackenedImageUrl(productOne.data.filepath)} alt="Current" width={200} />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <button type="submit" disabled={updateProduct.isLoading}>
          {updateProduct.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
