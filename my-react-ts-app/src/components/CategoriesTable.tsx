import { useNavigate } from 'react-router-dom'
import { Category } from '../interfaces/category.ts'
import useCategoriesGet from '../hooks/useCategoriesGet.ts'
import useCategoryDelete from '../hooks/useCategoryDelete.ts'

const CategoriesTable = () => {
  const navigate = useNavigate()
  const { categories, setCategories } = useCategoriesGet()

  const { triggerDelete } = useCategoryDelete({ categories, setCategories })

  return (
    <div className="bg-gray-900">
      <div className="mx-auto">
        <div className="bg-primary-dark py-10">
          <div className="">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">Categories</h1>
                <p className="mt-2 text-sm text-gray-300">A list of all categories</p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={() => {
                    navigate('/new-category')
                  }}
                >
                  Add category
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-0 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {categories?.map((category: Category) => (
                        <tr key={category.id}>
                          <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-white sm:pl-0">
                            {category.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-white sm:pl-0">
                            {category.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-300">
                            {category.is_active ? 'Active' : 'Inactive'}
                          </td>
                          <td className="flex gap-4 whitespace-nowrap px-3 py-3.5 text-sm font-medium">
                            <button
                              className="text-indigo-400 hover:text-indigo-300"
                              onClick={() => {
                                navigate(`/edit-category/${category.id}`)
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-indigo-400 hover:text-indigo-300"
                              onClick={() => triggerDelete(category.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesTable
