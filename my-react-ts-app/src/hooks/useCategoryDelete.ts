import { CATEGORY_API_URL, TOKEN_KEY } from '../utils/constant.ts'
import Swal from 'sweetalert2'
import { Category } from '../interfaces/category.ts'

interface UseCategoryDeleteProps {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

const useCategoryDelete = ({ categories, setCategories }: UseCategoryDeleteProps) => {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
      })

      if (!response.ok) {
        throw new Error('something went wrong')
      }

      await Swal.fire({
        icon: 'success',
        title: 'Category deleted'
      })
      setCategories(categories.filter((category: Category) => category.id !== id))
    } catch (error) {
      console.log(error)
      await Swal.fire({
        icon: 'error',
        title: 'Category delete failed'
      })
    }
  }

  return {
    triggerDelete: handleDelete
  }
}

export default useCategoryDelete
