import React, { lazy, Suspense, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '../types/data-type';
import { fetchProducts } from '../api/api';


const ProductItem = lazy(() => import('./ProductItem'));

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
},[page, searchQuery])
async function fetchMoreProducts(){
  const newProducts = await fetchProducts(page);
  setProducts((prevProducts)=>{
    const combinedProducts = [...prevProducts, ...newProducts];
    const uniqueProducts = Array.from(new Set(combinedProducts
        .map(product => product.id)))
        .map(id => combinedProducts
        .find(product => product.id === id))
    return uniqueProducts
  })

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
      loader={<h4>Loadding products...</h4>}
      className='grid grid-cols-5 w-fit gap-4'
     >
      <Suspense fallback={<div>Loading...</div>}>
      {
      products.length ===0 && !hasMore 
      ? <h1>Sorry, No products found</h1>
      : products.map((product:Product)=>(
          <ProductItem key={product.id} product={product}/>
        ))
      }
      </Suspense>
    </InfiniteScroll>
    </div>
  )
}

export default ProductList