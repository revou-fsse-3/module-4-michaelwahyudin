// src/Register.js

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { REGISTER_API_URL } from './constants';
import { Link } from 'react-router-dom';

const Register = () => {
  const [registrationMessage, setRegistrationMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(REGISTER_API_URL, values);
        // Registration successful
        setRegistrationMessage('Registration successful! You can now login.');
      } catch (error) {
        // Registration failed
        setRegistrationMessage('Registration failed. Please try again.');
      }
    },
  });

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...formik.getFieldProps('email')} />
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

        <button type="submit">Register</button>
      </form>

      {registrationMessage && <div>{registrationMessage}</div>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
