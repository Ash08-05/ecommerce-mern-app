import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//to add product
const addProduct = async (req, res) => {
  try {
    /* Validate Files */
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    /* Validate Fields */
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* Safe Image Access */
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image required",
      });
    }

    /* Upload */
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      size: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    res.json({
      success: true,
      message: "Product uploaded successfully",
      images: imagesUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
//total product list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server error",
    });
  }
};
//Remove the product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product Removed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};
//get single product detail
const singleproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export { addProduct, listProduct, removeProduct, singleproduct };
