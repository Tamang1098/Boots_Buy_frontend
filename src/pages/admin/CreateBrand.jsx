import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateBrand } from '../../hooks/admin/useAdminBrand'

export default function CreateBrand() {
    const {mutate, data, error, isPending} = useCreateBrand()
    const ValidationSchema = Yup.object(
        {
            name: Yup.String().required("Name required"),
            image: Yup.mixed ().nullable().test(
                "fileSize",
                "File to large",
                (value) => !value || (value && value.size <= 5*1024*1024)
            )
        }
    )
    const formik = useFormik (
        {
            initialValues: {
                name: "",
                image: ""
            },
            validationSchema,
            onSubmit: (values) => {
                const formData = new FormData() //multipart request
                formData.append("name", values.name)
                if(values.image) formData.append("image", values.image)
                mutate(formData,{
                       onSuccess: () => {
                        formik.resetForm() // reset fields
                       }
            })
            }
        }
    )
  return (
    <div>CreateBrand
        <form onSubmit={formik.handleSubmit}>
            <label>Category</label>
            <input
               name='name'
               onChange={formik.handleChange}
               value={formik.values.name}
            ></input>

            {formik.touched && formik.errors.name && <>(formik.errors.name)</>}

            <label>Brand Image</label>

            <input
              name='image'
              type='file'
              accept='image'
              onChange={
                (e)=>{
                    const file = e.currentTarget.files[0]
                    if(file) formik.setFieldValue("image",file)
                }
            }

            >

            </input>
            {formik.touched.image && formik.errors.image && <>{formik.errors.image}</>}
            {
                formik.values.image &&
                <img
                  class name='w-32 h-32 object-cover'
                  src={URL.createObjectURL(formik.values.image)}
                ></img>
            }
            <button type ='submit'> Create</button>
        </form>
    </div>
  )
}
