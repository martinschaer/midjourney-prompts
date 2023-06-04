import { Router, Route, RootRoute } from '@tanstack/router'

import App from './App'

// ============================================================================
// Route components
// ============================================================================
import About from './routes/About'
import Collection from './routes/Collection'
import Index from './routes/Index'
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

const collectionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/collection',
  component: Collection,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})
// ============================================================================

// Router instance
const routeTree = rootRoute.addChildren([
  aboutRoute,
  collectionRoute,
  indexRoute,
])
export const router = new Router({ routeTree })

// Router register for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}
