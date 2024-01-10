import React from 'react'
import { Category } from '../interfaces/category.ts'
import { CATEGORY_API_URL, TOKEN_KEY } from '../utils/constant.ts'

interface CategoryPayload {
  id: string
}

const useCategoryGet = ({ id }: CategoryPayload) => {
  const [category, setCategory] = React.useState<Category>({
    id: '',
    name: '',
    is_active: false
  })

  React.useEffect(() => {
    const fetchCategory = async () => {
      const bearerToken = localStorage.getItem(TOKEN_KEY)
      const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`
        }
      })
      const data = await response.json()
      setCategory(data.data)
    }

    fetchCategory()
  }, [id])

  return {
    category,
    setCategory
  }
}

export default useCategoryGet
