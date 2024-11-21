import React, { useEffect } from 'react'

function useDebounce(value:string, delay:number) {
  const [debouncedValue,setDebouncedValue] = React.useState(value);

useEffect(()=>{
  const handler = setTimeout(()=>{
    setDebouncedValue(value)
  },delay);
  return ()=>{
  clearTimeout(handler);
  }
},[value,delay])
  
  return debouncedValue;
}
export default useDebounce;