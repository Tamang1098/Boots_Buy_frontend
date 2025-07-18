import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../../hooks/useLoginUser';
import './LoginForm.css';
import loginBg from '../../assets/login.png'; 

export default function LoginForm() {
  const { mutate, data, error, isPending } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Please fill email"),
    password: Yup.string().min(8, "Password needs 8 characters").required("Please fill the password")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  return (
    <div className="login-background-container">
      <form onSubmit={formik.handleSubmit} className="login-form" autoComplete="off">
        <h2>Login</h2>

        {/* Hidden fake fields to prevent browser autofill */}
        <input type="text" name="fakeUser" autoComplete="username" style={{ display: 'none' }} />
        <input type="password" name="fakePass" autoComplete="new-password" style={{ display: 'none' }} />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="new-email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}

        <button type="submit" className="submit-button" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error">Login failed. Try again.</p>}
        {data && <p className="success">Login successful!</p>}
      </form>

      <img src={loginBg} alt="background" className="login-background-image" />
    </div>
  );
}
