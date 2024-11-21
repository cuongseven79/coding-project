import axios from 'axios';

export const fetchProducts = async(page:number, query:string ='')=>{
    const limit = 20;
    const skip = (page - 1) * limit
    const url = query
    ?`https://dummyjson.com/products/search?q=${query}`
    :`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    
    const res = await axios.get(url);
    return res.data.products
}