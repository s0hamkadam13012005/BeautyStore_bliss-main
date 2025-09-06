import Product from '../models/product.model.js';
import asyncHandler from 'express-async-handler';

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  if (!product) {
    res.status(400);
    throw new Error("Product not created");
  }

  res.status(201).json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(updatedProduct);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({ message: "Product deleted successfully" });
});

// Get Product by ID
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Get All Products (with query filters)
const getALLproducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qSearch = req.query.subcategory;

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 });
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else if (qSearch) {
    products = await Product.find({
      $text: {
        $search: qSearch,
        $caseSensitive: false,
        $diacriticSensitive: false
      }
    });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  }

  res.status(200).json(products);
});

// Rate Product
const ratingProduct = asyncHandler(async (req, res) => {
  const { star, name, comment, postedBy } = req.body;

  if (star && name && comment && postedBy) {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: { ratings: { star, name, comment, postedBy } }
      },
      { new: true }
    );

    res.status(201).json(updatedProduct);
  } else {
    res.status(400);
    throw new Error("Product not rated - missing fields");
  }
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getALLproducts,
  ratingProduct
};
