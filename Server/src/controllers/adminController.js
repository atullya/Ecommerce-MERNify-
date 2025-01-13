import Product from "../models/product.model.js";
export const uploadProducts = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes } = req.body;

    if (!name || !description || !price || !req.file) {
      return res.status(400).json({
        message: "All fields are required, including an image!",
      });
    }

    // Image path
    const imageUrl = req.file.path;

    //insert in database
    const proDetails = new Product({
      name,
      description,
      price,
      image: imageUrl,
      category,
      subCategory,
      sizes,
    });
    const insertProduct = await proDetails.save();
    // Save product to database (assuming a function saveProduct exists)
    // await saveProduct({ name, description, price, category, subCategory, imageUrl });
    if (!insertProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to insert product" });
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
        imageUrl,
        sizes,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
