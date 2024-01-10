import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'

import useCategoryUpdate from '../hooks/useCategoryUpdate.ts'
import useCategoryGet from '../hooks/useCategoryGet.ts'

const EditCategory = () => {
  const { categoryId } = useParams() as { categoryId: string }
  const { triggerUpdate } = useCategoryUpdate()
  const { category } = useCategoryGet({ id: categoryId })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: category.id,
      name: category.name,
      is_active: category.is_active
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      is_active: Yup.boolean().required('Required')
    }),
    onSubmit: async (_, { resetForm }) => {
      await triggerUpdate(formik.values)
      resetForm()
    }
  })

  return (
    <div className={`w-full text-white`}>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Edit Category
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Name
              </label>
              <div className="mt-2">
                <input
                  {...formik.getFieldProps('name')}
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full rounded-md border-0 bg-white/5 p-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className={`mt-2 text-red-300`}>{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Status
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id={'active'}
                  name="status"
                  type="radio"
                  value={'true'}
                  checked={formik.values.is_active}
                  onChange={() => {
                    formik.setFieldValue('is_active', true)
                  }}
                />
                <label
                  htmlFor="active"
                  className="mr-7 block text-sm font-medium leading-6 text-white"
                >
                  Active
                </label>
                <input
                  id={'inactive'}
                  name="status"
                  type="radio"
                  value={'false'}
                  checked={!formik.values.is_active}
                  onChange={() => {
                    formik.setFieldValue('is_active', false)
                  }}
                />
                <label
                  htmlFor="inactive"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Inactive
                </label>
              </div>
              {formik.errors.is_active ? (
                <div className={`mt-2 text-red-300`}>{formik.errors.is_active}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCategory
