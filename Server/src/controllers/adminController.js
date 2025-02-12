import Product from "../models/product.model.js";

export const uploadProducts = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes } = req.body;

    // Ensure all fields are provided
    if (
      !name ||
      !description ||
      !price ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        message: "All fields are required, including at least one image!",
      });
    }

    // Extract image paths from uploaded files
    const imageUrls = req.files.map((file) => file.path);

    // Insert into database
    const proDetails = new Product({
      name,
      description,
      price,
      image: imageUrls, // Store multiple images
      category,
      subCategory,
      sizes,
    });

    const insertProduct = await proDetails.save();

    if (!insertProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to insert product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully uploaded a new product!",
      data: {
        name,
        description,
        price,
        category,
        subCategory,
        imageUrls,
        sizes,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all products!",
      data: products,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete product",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully deleted product",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, subCategory, sizes } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, subCategory, sizes }, // Update object
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to update product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated product",
      data: updatedProduct, // Optional: Return updated product data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
