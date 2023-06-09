import React from 'react'
import ReactDOM from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/router'

import { router } from './router'

import './index.css'

// const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <RouterProvider router={router} basepath="/midjourney-prompts" />
    {/* </QueryClientProvider> */}
  </React.StrictMode>,
)
