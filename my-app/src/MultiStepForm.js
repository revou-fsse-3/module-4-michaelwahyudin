import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const validationSchema = Yup.object().shape({
    fullName: step === 1
      ? Yup.string().matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Full Name should contain first name and last name').required('Full Name is required')
      : Yup.string(),

    email: step === 1
      ? Yup.string().email('Invalid email format').required('Email is required')
      : Yup.string(),

    dob: step === 1
      ? Yup.date()
        .max(new Date(), 'Date of Birth cannot be in the future')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 150)), 'Date of Birth cannot be older than 150 years')
        .required('Date of Birth is required')
      : Yup.date(),

    streetAddress: step === 2
      ? Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\s,.'-]+$/, 'Invalid Street Address').required('Street Address is required')
      : Yup.string(),

    city: step === 2
      ? Yup.string().matches(/^[a-zA-Z\s]+$/, 'City must only contain letters').required('City must not contain number')
      : Yup.string(),

    state: step === 2
      ? Yup.string().matches(/^[a-zA-Z\s]+$/, 'State must only contain letters').required('State must not contain number')
      : Yup.string(),

    zipCode: step === 2
      ? Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code').required('Zip Code is required')
      : Yup.string(),

    username: step === 3
      ? Yup.string().required('Username is required').min(8, 'Username must be at least 8 characters')
      : Yup.string(),

    password: step === 3
      ? Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
      : Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);

    // Increment the step after successful submission
    nextStep();
  };

  useEffect(() => {
    // You can perform additional actions when the step changes
    // For example, scroll to the top of the form
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        dob: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Information</h2>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <Field type="text" id="fullName" name="fullName" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <Field type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <Field type="date" id="dob" name="dob" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="button"
                onClick={() => {
                  formikProps.validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      nextStep();
                    }
                  });
                }}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Address Information</h2>
              <div className="mb-4">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-600">
                  Street Address
                </label>
                <Field type="text" id="streetAddress" name="streetAddress" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                  City
                </label>
                <Field type="text" id="city" name="city" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                  State
                </label>
                <Field type="text" id="state" name="state" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-600">
                  Zip Code
                </label>
                <Field type="text" id="zipCode" name="zipCode" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={!formikProps.isValid}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Next
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="mt-4 ml-4 bg-gray-500 text-white p-2 rounded"
              >
                Previous
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Step 3: Account Information</h2>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <Field type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <Field type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={!formikProps.isValid}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="mt-4 ml-4 bg-gray-500 text-white p-2 rounded"
              >
                Previous
              </button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
