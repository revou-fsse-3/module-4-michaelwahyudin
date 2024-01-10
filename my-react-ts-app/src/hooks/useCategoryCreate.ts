import { CATEGORY_API_URL, TOKEN_KEY } from '../utils/constant.ts'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

interface CreateCategoryPayload {
  name: string
  is_active: boolean
}

const useCategoryCreate = () => {
  const navigate = useNavigate()
  const handleCreate = async (payload: CreateCategoryPayload) => {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('something went wrong')
      }

      await Swal.fire({
        icon: 'success',
        title: 'New category created'
      })
      navigate('/')
    } catch (error) {
      console.log(error)
      await Swal.fire({
        icon: 'error',
        title: 'Create category failed'
      })
    }
  }

  return {
    triggerCreate: handleCreate
  }
}

export default useCategoryCreate
