import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import {
  useGetOneUser,
  useUpdateOneUser,
} from '../../hooks/admin/useAdminUser';
// import './UpdateUser.css';

export default function UpdateUser() {
  const { id } = useParams();
  const { user, isLoading: isFetching } = useGetOneUser(id);
  const { mutate, isPending } = useUpdateOneUser();

  const validationSchema = Yup.object({
   
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),

    email:Yup. string()
    .min(3, "Email must required")
    .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
  });
  console.log(user)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      
      username: user?.username || '',
      password: user?.password || '',
      email: user?.email || '',
     
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        { id, data: values },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

  if (isFetching) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="update-user-container">
      <h2 className="update-user-title">Update User</h2>
      <form className="update-user-form" onSubmit={formik.handleSubmit}>
        
        {/* Username */}
        <div className="form-group">
          <label className="form-label">
            Username <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="username"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="form-error">{formik.errors.username}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">
            Password <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="form-error">{formik.errors.password}</div>
          )}
        </div>

        {/* email */}
        <div className="form-group">
          <label className="form-label">
            Phone <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="email"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="form-error">{formik.errors.email}</div>
          )}
        </div>

        

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
}


