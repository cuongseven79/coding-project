import React from 'react'
import { ProductItemProps } from '../types/data-type'



const ProductItem:React.FC<ProductItemProps> = ({product}) => {
  return (
    <div className=''>
      <div className='bg-blue-100 w-fit px-3 rounded-xl text-center'>
        <img 
          src={product.thumbnail}
          className='w-[300px]'
          alt={product.title}/>
      </div>
      <h3>{product.title}</h3>
      <span>{product.price}</span>
      {/* <p>{product.description}</p> */}
    </div>
  )
}

export default ProductItem
