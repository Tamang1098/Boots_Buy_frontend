import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateBrand } from '../../hooks/admin/useAdminBrand';

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create Brand</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Brand Name</label>
          <input
            name="brandname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.brandname}
            className="border p-2 w-full"
          />
          {formik.touched.brandname && formik.errors.brandname && (
            <p className="text-red-500 text-sm">{formik.errors.brandname}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Brand Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('image', file);
            }}
            className="block"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        </div>

        {formik.values.image && (
          <img
            src={URL.createObjectURL(formik.values.image)}
            alt="Preview"
            className="w-32 h-32 object-cover border"
          />
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
