
import { useProductContext } from '@/ContextAPI/ProductContext'
import star_icon from "../../assets/frontend_assets/star_icon.png"
import star_dull_icon from "../../assets/frontend_assets/star_dull_icon.png"

import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const ProductDisplay = () => {
  const {products}=useProductContext();
  const {id}=useParams()
  const product=products.find((el)=>el._id==id)
  console.log(product)
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
    <Navbar/>
    <div className="flex flex-col mt-8 lg:flex-row lg:mx-24">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="flex flex-col gap-2 lg:gap-2">

      <img className="h-10 lg:h-24" src={product.image[0]} alt="" />
      <img className="h-10 lg:h-24" src={product.image[0]} alt="" />
      <img className="h-10 lg:h-24" src={product.image[0]} alt="" />
      <img className="h-20 lg:h-24" src={product.image[0]} alt="" />
         
        </div>
        <div>
          <img className="w-auto lg:w-[320px] lg:h-[410px]" src={product.image[0]} alt="" />
        </div>
      </div>
      <div className="flex flex-col lg:ml-16">
      <h1 className="text-gray-700 text-3xl lg:text-4xl font-bold">{product.name}</h1>
      <div className="flex items-center gap-2 mt-3 text-gray-800 text-lg">
      <img src={star_icon} alt="" />
      <img src={star_icon} alt="" />
      <img src={star_icon} alt="" />
      <img src={star_icon} alt="" />
      <img src={star_dull_icon} alt="" />
      <p>(111)</p>
        </div>
        <div className="flex gap-6 my-4 text-xl font-bold">
        <div className="text-gray-500 line-through">${product.price}</div>
        <div className="text-red-500">${product.price}</div>
          </div>
          <p className="text-gray-600">{product.description}.</p>
          <div className='mt-5'>
          <h2 className="text-gray-500 text-lg font-semibold">Select Size</h2>
          <div className="flex gap-5 mt-4">
            {product.sizes.map((item)=>( <div className="px-6 py-4 bg-gray-50 border border-gray-200 rounded cursor-pointer">{item}</div>))}
        
          </div>
          <button  className="bg-red-500 text-white px-10 py-4 mt-6 rounded font-semibold">Add to Cart</button>
          </div>
        </div>
      
    </div>
    </>
  )
}

export default ProductDisplay
