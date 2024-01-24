// src/Category.js

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CATEGORY_API_URL, TOKEN_KEY, ADD_API, UPDATE_API } from './constants';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
          console.error('Token not available. Please log in.');
          return;
        }

        console.log('Token:', token);

        if (editingCategory) {
          await axios.put(
            `${UPDATE_API}/${editingCategory.id}`,
            {
              name: values.categoryName,
              is_active: false, // Set your desired value for is_active
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.post(
            ADD_API,
            { name: values.categoryName },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        await fetchData();

        formik.resetForm();
        setEditingCategory(null);
      } catch (error) {
        console.error('API error:', error);
      }
    },
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        console.error('Token not available. Please log in.');
        return;
      }

      const response = await axios.get(CATEGORY_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API response:', response);

      if (
        response.data &&
        typeof response.data === 'object' &&
        response.data.data
      ) {
        setCategories(response.data.data);
      } else {
        console.error('Unexpected API response structure:', response);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    formik.setValues({ categoryName: category.name });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        console.error('Token not available. Please log in.');
        return;
      }

      await axios.delete(`${UPDATE_API}/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchData();

      formik.resetForm();
      setEditingCategory(null);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Category</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="categoryName">Category Name</label>
        <input
          id="categoryName"
          type="text"
          {...formik.getFieldProps('categoryName')}
        />
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div>{formik.errors.categoryName}</div>
        ) : null}

        <button type="submit">
          {editingCategory ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleEditCategory(category)}>Edit</button>
            <button onClick={() => handleDeleteCategory(category.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/">Home</Link> {/* Link to the home page */}
      </p>
    </div>
  );
};

export default Category;
