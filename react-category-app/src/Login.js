// src/Login.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { LOGIN_API_URL, TOKEN_KEY } from './constants';
import { Link } from 'react-router-dom';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '', // Change from 'username' to 'email'
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'), // Validate email
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(LOGIN_API_URL, values);
        localStorage.setItem(TOKEN_KEY, response.data.token);
        // Handle successful login
      } catch (error) {
        // Handle login error
      }
    },
  });

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label> {/* Change from 'username' to 'email' */}
        <input
          id="email" // Change from 'username' to 'email'
          type="text" // You can change to 'email' if you prefer
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
