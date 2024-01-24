// src/Category.js

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CATEGORY_API_URL, TOKEN_KEY } from './constants';
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

        if (editingCategory) {
          // Update category
          await axios.put(
            `${CATEGORY_API_URL}/${editingCategory.id}`,
            values,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          // Add new category
          await axios.post(CATEGORY_API_URL, values, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        // Fetch updated category list
        const response = await axios.get(CATEGORY_API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);

        // Reset form
        formik.resetForm();
        setEditingCategory(null);
      } catch (error) {
        // Handle category creation/update error
      }
    },
  });

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    formik.setValues({ categoryName: category.name });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      await axios.delete(`${CATEGORY_API_URL}/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch updated category list
      const response = await axios.get(CATEGORY_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);

      // Reset form
      formik.resetForm();
      setEditingCategory(null);
    } catch (error) {
      // Handle category deletion error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
  
        const response = await axios.get(CATEGORY_API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Category fetch error:', error);
      }
    };
  
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
            <button onClick={() => handleEditCategory(category)}>
              Edit
            </button>
            <button onClick={() => handleDeleteCategory(category.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/">Home</Link> {/* Link to home page */}
      </p>
    </div>
  );
};

export default Category;
