import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GobalState } from "../../../GobalState";

import ProductItem from "../products/ProductItem";
const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GobalState);
  const [products] = state.ProductsApi.products;
  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (params) {
      products.forEach((item) => {
        if (item._id === params.id) {
          setDetailProduct(item);
        }
      });
    }
  }, [params, products]);
  if (detailProduct.length === 0) return null;
  console.log(detailProduct.images);
  const addCart = state.UserApi.addCart;
  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="d" />
        <div className="detail__box">
          <div className="detail__row">
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Số lượng:{detailProduct.sold}</p>
          <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>
            Buy Now
          </Link>
        </div>
      </div>
      <h2>Sản phẩm cùng danh mục</h2>
      <div className="products">
        {products.map((item) =>
          item.category === detailProduct.category ? (
            <ProductItem item={item} key={item._id} />
          ) : null
        )}
      </div>
    </>
  );
};

export default DetailProduct;
