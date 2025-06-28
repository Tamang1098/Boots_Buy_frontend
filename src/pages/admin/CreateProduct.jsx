import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateProduct } from "../../hooks/admin/useAdminProduct";
import { getAllBrandApi } from "../../api/admin/brandApi";
import "./CreateProduct.css";

export default function CreateProduct() {
  const { mutate: createProduct, isPending, error } = useCreateProduct();
  const [brand, setBrand] = useState([]); // ✅ must be an array

  // ✅ Fetch brands on mount
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await getAllBrandApi();
        setBrand(res.data?.data || []); // ✅ safely extract array
      } catch (err) {
        console.error("Failed to fetch brands", err);
      }
    };
    fetchBrand();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(1, "Price must be at least 1"),
    brandId: Yup.string().required("Brand is required"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large", (value) => !value || value.size <= 5 * 1024 * 1024),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      brandId: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("brandId", values.brandId);
      if (values.image) formData.append("image", values.image);

      createProduct(formData, {
        onSuccess: () => {
          alert("Product created successfully");
          formik.resetForm();
        },
      });
    },
  });

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Product Name */}
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

        {/* Product Price */}
        <label>Price</label>
        <input
          type="number"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="error">{formik.errors.price}</div>
        )}

        {/* Brand Select */}
        <label>Brand</label>
        <select
          name="brandId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brandId}
        >
          <option value="">Select a brand</option>
          {brand.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand._id}
            </option>
          ))}
        </select>
        {formik.touched.brandId && formik.errors.brandId && (
          <div className="error">{formik.errors.brandId}</div>
        )}

        {/* Image Upload */}
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            formik.setFieldValue("image", file);
          }}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="error">{formik.errors.image}</div>
        )}

        {/* Preview Image */}
        {formik.values.image && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              width={200}
            />
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Product"}
        </button>

        {/* Error */}
        {error && <div className="error">{error.message}</div>}
      </form>
    </div>
  );
}

