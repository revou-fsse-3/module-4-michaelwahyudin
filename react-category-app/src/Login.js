// src/Login.js

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { LOGIN_API_URL, TOKEN_KEY } from './constants';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(LOGIN_API_URL, values);
        const token = response.data.token;

        // Store token in local storage
        storeTokenInLocalStorage(token);

        // Handle successful login
        setLoginMessage('Login successful!');

        // Redirect to Category page after successful login
        navigate('/category');
      } catch (error) {
        // Handle login error
        setLoginMessage('Login failed. Please check your email and password.');
      }
    },
  });

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" {...formik.getFieldProps('email')} />
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

      {loginMessage && <div>{loginMessage}</div>}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
