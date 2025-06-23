import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateBrand } from '../../hooks/admin/useAdminBrand';
import './CreateBrand.css';

export default function CreateBrand() {
  const { mutate, isPending, error } = useCreateBrand();

  const validationSchema = Yup.object({
    brandname: Yup.string().required('Brand name is required'),
    image: Yup.mixed()
      .nullable()
      .test('fileSize', 'File too large', (value) =>
        !value || (value && value.size <= 5 * 1024 * 1024)
      )
  });

  const formik = useFormik({
    initialValues: {
      brandname: '',
      image: null
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('brandname', values.brandname);
      if (values.image) formData.append('image', values.image);

      mutate(formData, {
        onSuccess: () => formik.resetForm()
      });
    }
  });

  return (
    <div className="create-brand-wrapper">
      <div className="create-brand-card">
        <h2 className="create-brand-title">Create Brand</h2>
        <form onSubmit={formik.handleSubmit} className="create-brand-form">
          <div className="create-brand-field">
            <label className="create-brand-label">Brand Name</label>
            <input
              name="brandname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.brandname}
              className="create-brand-input"
            />
            {formik.touched.brandname && formik.errors.brandname && (
              <p className="create-brand-error">{formik.errors.brandname}</p>
            )}
          </div>

          <div className="create-brand-field">
            <label className="create-brand-label">Brand Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue('image', file);
              }}
              className="create-brand-file-input"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="create-brand-error">{formik.errors.image}</p>
            )}
          </div>

          {formik.values.image && (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="create-brand-preview"
            />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="create-brand-button"
          >
            {isPending ? 'Creating...' : 'Create'}
          </button>

          {error && <p className="create-brand-error mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
