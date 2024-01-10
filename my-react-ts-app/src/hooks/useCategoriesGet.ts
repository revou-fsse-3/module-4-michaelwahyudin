import React from 'react'
import { Category } from '../interfaces/category.ts'
import { CATEGORY_API_URL, TOKEN_KEY } from '../utils/constant.ts'

const useCategoriesGet = () => {
  const [categories, setCategories] = React.useState<Category[]>([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const bearerToken = localStorage.getItem(TOKEN_KEY)
      const response = await fetch(CATEGORY_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`
        }
      })
      const data = await response.json()
      setCategories(data.data)
    }

    fetchCategories()
  }, [])

  return {
    categories,
    setCategories
  }
}

export default useCategoriesGet
