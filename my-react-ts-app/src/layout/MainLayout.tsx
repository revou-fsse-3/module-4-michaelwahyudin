import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'

const MainLayout = () => {
  return (
    <div className="min-h-full bg-primary-dark">
      <Header />
      <main className="mx-auto flex h-[calc(100vh-80px)] max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-8 mt-4 flex w-full max-w-7xl flex-col items-center justify-between self-center rounded-md px-6 py-6 shadow-md shadow-secondary-dark sm:px-6 lg:mt-8 lg:px-8`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
