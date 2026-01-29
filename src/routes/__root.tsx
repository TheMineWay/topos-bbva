import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MainLayout } from '../layouts/main/main.layout'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
