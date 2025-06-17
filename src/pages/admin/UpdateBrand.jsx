import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useGetOneBrand, useUpdateOneBrand } from '../../hooks/admin/useAdminBrand';
import { useParams } from 'react-router-dom';
import { getBackenedImageUrl } from '../../utils/backened-image';
import './UpdateBrand.css'; // Make sure this path matches your folder structure

export default function UpdateBrand() {
  const { id } = useParams();
  const brandOne = useGetOneBrand(id);
  const updateBrand = useUpdateOneBrand();

  const validationSchema = Yup.object({
    brandname: Yup.string().required("Name required"),
    image: Yup.mixed().nullable().test(
      "fileSize",
      "File too large",
      (value) => !value || value.size <= 5 * 1024 * 1024
    )
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brandname: brandOne.brand?.brandname || "",
      image: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("brandname", values.brandname);
      if (values.image) formData.append("image", values.image);

      updateBrand.mutate(
        { id, data: formData },
        { onSuccess: () => formik.resetForm() }
      );
    }
  });

  return (
    <div className="update-brand-container">
      <h2 className="update-brand-title">Update Brand</h2>
      <form className="update-brand-form" onSubmit={formik.handleSubmit}>
        <label className="form-label">Brand Name</label>
        <input
          className="form-input"
          name="brandname"
          onChange={formik.handleChange}
          value={formik.values.brandname}
        />
        {formik.touched.brandname && formik.errors.brandname && (
          <div className="form-error">{formik.errors.brandname}</div>
        )}

        <label className="form-label">Brand Image</label>
        <input
          className="form-input"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) formik.setFieldValue("image", file);
          }}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="form-error">{formik.errors.image}</div>
        )}

        <div className="image-preview">
          {formik.values.image ? (
            <img
              className="preview-image"
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
            />
          ) : (
            <img
              className="preview-image"
              src={getBackenedImageUrl(brandOne.brand?.filepath)}
              alt="Current"
            />
          )}
        </div>

        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
}
