const Products = require("../models/productModel");

class API {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // loc
  filtering() {
    const queryObj = { ...this.queryString };
    //truoc khi xoa

    //sau khi xoa
    const excluded = ["page", "sort", "limit"];
    excluded.forEach((e) => delete queryObj[e]);

    //chuyen ve dang string
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    // loc theo gia,ki tu
    //gt :loc lon hon 10,lon hon 60 ko co
    //lt lọc các sản phẩm có giá nhỏ hơn VD: nhỏ hơn 10 :không có,nhỏ hơn 60 có
    //gtx là lọc các sản phẩm lớn hơn hoặc bằng
    // ltx là lọc các sản phẩm nhỏ hơn hoặc bằng
    // regex là lọc bằng các kí tự
    return this;
  }
  // sap xep
  sorting() {
    // nếu là chữ
    if (this.queryString.sort) {
      // chuyển các kí tự , thành
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // lọc theo tất trừ  ngày khởi tạo
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  // phan trang
  paginating() {
    const page = this.queryString.page * 1 || 1;
    //1 trang có bn sản phẩm VD 1 trang có 1 sp,
    // 2 sản phẩm
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new API(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.json({
        status: "seccess",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        description,
        price,
        contact,
        images,
        categories,
      } = req.body;
      if (!images) {
        return res.status(400).json({ msg: "No images selected" });
      }
      const product = await Products.findOne({ product_id });
      if (product) {
        return res.status(400).json({ msg: "This product already exist" });
      }
      const newProduct = await Products({
        product_id,
        title: title.toLowerCase(),
        description,
        price,
        contact,
        images,
        categories,
      });
      //   res.json({newProduct})
      await newProduct.save();
      res.json("create a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json("delete a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        description,
        price,
        contact,
        images,
        categories,
      } = req.body;
      if (!images) {
        return res.status(400).json({ msg: "No images selected" });
      }
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, price, contact, images, categories }
      );
      res.json("update a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productCtrl;
