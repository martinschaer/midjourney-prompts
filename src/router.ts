import { Router, Route, RootRoute } from '@tanstack/router'

import App from './App.tsx'

// ============================================================================
// Route components
// ============================================================================
import About from './routes/About.tsx'
import Index from './routes/Index.tsx'
// ============================================================================

const rootRoute = new RootRoute({ component: App })

// ============================================================================
// Route definitions
// ============================================================================
const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})
// ============================================================================

// Router instance
const routeTree = rootRoute.addChildren([aboutRoute, indexRoute])
export const router = new Router({ routeTree })

// Router register for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}
