import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { ProductProvider } from './ContextAPI/ProductContext.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Collection from './pages/Collection/Collection.tsx'
import ProductDisplay from './components/ProductDisplay/ProductDisplay.tsx'
import CartPage from './pages/Cart/CartPage.tsx'
import { ModalProvider } from './ContextAPI/ModalContext.tsx'
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
  },
  {
    path:'/cart',
    element:<CartPage/>
  }
])

createRoot(document.getElementById('root')!).render(

  <ModalProvider>
<ProductProvider>

  <StrictMode>
    
    
  <RouterProvider router={allroutes}/>
  </StrictMode>,
</ProductProvider>
</ModalProvider>


)
