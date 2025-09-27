import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { useSelector } from 'react-redux'
import type { InitState } from '@/interfaces/dataType'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const activeTheme = useSelector((state:InitState) => state.activeTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark")
    }
  }, [activeTheme])

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
