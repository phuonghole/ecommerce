import { useContext, useState, useEffect } from "react";
import { GobalState } from "../../../GobalState";
import Loading from "../loading/Loading";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const CreateProduct = () => {
  const state = useContext(GobalState);
  const [categories] = state.CategoryApi.categories;
  const [callback,setCallback] = state.ProductsApi.callback;
  const data = {
    product_id: "",
    title: "",
    price: 0,
    description: "Mô tả sản phẩm",
    contact: "Nội dung sản phẩm",
    category: "",
    _id: "",
  };
  const [product, setProduct] = useState(data);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const [loading, setLoading] = useState(false);
  const [images, setImage] = useState(false);

  const upload = {
    display: images ? "block" : "none",
  };
  const [isAdmin] = state.UserApi.isAdmin;
  const [token] = state.token;
  const updateInput = async (e) => {
    e.preventDefault();
    try {
      // if(!isAdmin){
      //   return alert("You're not an admin")
      // }
      //cách 2
      !isAdmin && alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) {
        return alert("File not exist");
      }
      if (file.size > 1024 * 1024) {
        return alert("Size too large");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("File Format is incorrect");
      }

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const deleteInput = async () => {
    try {
      !isAdmin && alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const navigate = useNavigate();
  const param = useParams();
  const [products] = state.ProductsApi.products;
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (param.id) {
      setEdit(true);
      products.forEach((item) => {
        if (item._id === param.id) {
          setProduct(item);
          setImage(item.images);
        }
      });
    } else {
      setEdit(false);
      setProduct(data);
      setImage(false);
    }
  }, [param.id, products]);

  const onSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      !isAdmin && alert("You're not an admin");
      if (!images) {
        return alert("No image upload");
      }
      if(edit){
        await axios.put(`/api/product/${product._id}`,{ ...product, images },{
          headers: { Authorization: token },
        });
      }
      else{
        await axios.post("/api/product",{ ...product, images },{
          headers: { Authorization: token },
        });
      }
      setCallback(!callback)
      setImage(false);
      setProduct(data);
      navigate.push("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="create__product">
      <div className="upload">
        <input type="file" onChange={updateInput} />
        {loading ? (
          <div className="loadingup">
            <Loading />
          </div>
        ) : (
          <>
            <img style={upload} src={images ? images.url : ""} alt="" />
            <span style={upload} onClick={deleteInput}>
              X
            </span>
          </>
        )}
      </div>
      <form onSubmit={onSubmitProduct}>
        <div className="row">
          <label>
            Product ID
            <input
              type="text"
              value={product.product_id}
              name="product_id"
              onChange={onChangeInput}
              disabled={edit}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Title
            <input
              type="text"
              value={product.title}
              name="title"
              onChange={onChangeInput}
              
            />
          </label>
        </div>
        <div className="row">
          <label>
            Price
            <input
              type="number"
              value={product.price}
              name="price"
              onChange={onChangeInput}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Description
            <textarea
              name="description"
              value={product.description}
              onChange={onChangeInput}
            ></textarea>
          </label>
        </div>
        <div className="row">
          <label>
            Content
            <textarea
              name="contact"
              value={product.contact}
              onChange={onChangeInput}
            ></textarea>
          </label>
        </div>
        <div className="row">
          <label>
            Category
            <select
              name="categories"
              value={product.categories}
              onChange={onChangeInput}
            >
              <option value="">Select a categpry</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button>{edit ? "Upload" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
