import React, { useState } from 'react'
import ProductList from '../../components/ProductList'
import InputSearch from '../../components/InputSearch';

const HomePage = () => {
      const [searchQuery, setSearchQuery] = React.useState<string>('');

  return (
    <div className=''>
        <h1 className='text-center text-3xl'>Homepage</h1>
        <InputSearch className='border py-4' onSearch={setSearchQuery}/>
        <ProductList searchQuery={searchQuery}/>
    </div>
  )
}

export default HomePage