import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='container mx-auto'>
      <Navbar />
      <main className='min-h-screen px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
      <p>Footer</p>
    </div>
  )
}
