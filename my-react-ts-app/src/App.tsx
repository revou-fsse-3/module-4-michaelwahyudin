import MultipleForm from './components/Form'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './routes/404.tsx'
import MainLayout from './layout/MainLayout.tsx'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import NewCategory from './routes/NewCategory.tsx'
import React from 'react'
import PrivateRoute from './routes/PrivateRoute.tsx'
import { TokenContext } from './context/tokenContext.ts'
import EditCategory from './routes/EditCategory.tsx'

function App() {
  const [token, setToken] = React.useState('')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )
        },
        {
          path: '/new-category',
          element: (
            <PrivateRoute>
              <NewCategory />
            </PrivateRoute>
          )
        },
        {
          path: '/edit-category/:categoryId',
          element: (
            <PrivateRoute>
              <EditCategory />
            </PrivateRoute>
          )
        },
        {
          path: '/login',
          element: <Login setToken={setToken} />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/multistep-form',
          element: <MultipleForm />
        },
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ])

  const value = React.useMemo(() => ({ token, setToken }), [token])

  return (
    <TokenContext.Provider value={value}>
      <RouterProvider router={router} />
    </TokenContext.Provider>
  )
}

export default App
