import React, { useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

interface InputSearchProps{
  className?:string;
  onSearch?:(query:string)=>void;
}

const InputSearch:React.FC<InputSearchProps> = ({
  className,
  onSearch = ()=>{}
}) => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const debouncedSearchQuery = useDebounce(inputValue, 500);
  useEffect(()=>{
    onSearch(debouncedSearchQuery)
  },[debouncedSearchQuery, onSearch])
  
  return (
    <div className={`${className} w-[50%] rounded-md`}>
      <input
          type='text'
          placeholder='Search Product...'
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          className={`border-gray-300 p-4 rounded-md w-full`}
          />
    </div>
  )
}

export default InputSearch