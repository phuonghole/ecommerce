import { useState, useEffect } from "react";
import axios from "axios";
const ProductApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category,setCategory]= useState("")
  const [search,setSearch]= useState("")
  const [sort,setSort]= useState("")
  const [page,setPage]= useState(1)
  const [result,setResult]= useState(0)
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/product?${category}&title[regex]=${search}&${sort}&limit=${page*8}`);
      // console.log(res.data.products);
      setProducts(res.data.products);
      setResult(res.data.result)
    };
    getProducts();
  }, [callback,category,search,sort,page,result]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category:[category,setCategory],
    search: [search,setSearch],
    sort:[sort,setSort],
    page:[page,setPage],
    result:[result,setResult],
  };
};

export default ProductApi;
