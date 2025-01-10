import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { ProductProvider } from './ContextAPI/ProductContext.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Collection from './pages/Collection/Collection.tsx'
import ProductDisplay from './components/ProductDisplay/ProductDisplay.tsx'
const allroutes=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/collection',
    element:<Collection/>
  },{
    path:'/product/:id',
    element:<ProductDisplay/>
  }
])

createRoot(document.getElementById('root')!).render(
<ProductProvider>

  <StrictMode>
    
    
  <RouterProvider router={allroutes}/>
  </StrictMode>,
</ProductProvider>

)
