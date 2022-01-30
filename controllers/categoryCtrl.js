const Category = require("../models/categoryModel");
const Products = require("../models/productModel");
const categoryCtrl = {
  // view all category
  getCategories: async (req, res) => {
    try {
      const categorys = await Category.find();
      res.json(categorys);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //create a category
  //only admin can create category,delete,update =>chỉ có admin mới có thể thêm sửa xóa danh mục sản phẩm
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "The name already exists" });
      const newCategory = await Category({ name });
      //   res.json({ newCategory });
      await newCategory.save();
      res.json("create a category");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const product = await Products.findOne({ categories: req.params.id });
      if (product) return res.status(400).json({ msg: "Delete all product" });
      await Category.findByIdAndDelete(req.params.id);
      res.json("delete a category");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json("update a category");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = categoryCtrl;
