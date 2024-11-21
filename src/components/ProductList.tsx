import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '../types/data-type';
import { fetchProducts } from '../api/api';
import ProductItem from './ProductItem';

const ProductList: React.FC<{searchQuery : string}> = ({searchQuery}) => {
const [products,setProducts] = useState<Product[]>([]);
const [page, setPage] = useState<number>(1);
const [hasMore, setHasMore] = useState<boolean>(true);


useEffect(()=>{
  if (searchQuery) {
    searchProduct(searchQuery)
  }else{
    setProducts([])
    setPage(1);
    setHasMore(true);
  }
},[searchQuery])

useEffect(()=>{
  if(!searchQuery){
    fetchMoreProducts();
  }
},[page])

  async function fetchMoreProducts(){
    const newProducts = await fetchProducts(page);
    setProducts((prevProducts)=>[...prevProducts, ...newProducts])
    if(newProducts.length < 20){
      setHasMore(false)
    }
  }

  async function searchProduct(searchQuery:string){
    const searchedProducts = await fetchProducts(1, searchQuery)
    setProducts(searchedProducts)
    setHasMore(false);
  }
  
  return (
    <div>
      <InfiniteScroll
      dataLength= {products.length}
      next={() => setPage((prev) => prev+1)}
      hasMore={hasMore}
      loader={<h4>loadding...</h4>}
      className='grid grid-cols-5 w-fit gap-4'
     >
      {products.map((product:Product)=>(
          <ProductItem key={product.id} product={product}/>
      ))}
    </InfiniteScroll>
    </div>
  )
}

export default ProductList