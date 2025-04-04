import { conn } from "../DB/DB.js";
import moment from "moment";
import multer from "multer";

let imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

//Img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only image is allow!!!"));
  }
};

let upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
}).single("productImage");

export const getAllProd = (req, res) => {
  const select = "SELECT * FROM product";
  conn.query(select, (err, result) => {
    if (err) throw err;
    return res.status(200).json({ status: 200, data: result });
  });
};

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  const select = `SELECT * FROM product WHERE id=${id}`;
  try {
    conn.query(select, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ status: 200, data: result });
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const addProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, error: "Image upload failed" });
    }
    const {
      productName,
      productDescription,
      productOwner,
      productStock,
      productPrice,
      productCategory,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productOwner ||
      !productStock ||
      !productPrice ||
      !productCategory
    ) {
      return res
        .status(400)
        .json({ status: 400, error: "All fields are required" });
    }

    let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss"); // ✅ Correct format
    const productImage = req.file ? req.file.filename : "default.jpg";

    const productData = {
      pName: productName,
      pDescription: productDescription,
      pAddDate: date,
      pOwner: productOwner,
      pStock: productStock,
      pPrice: productPrice,
      pCategory: productCategory,
      pImage: productImage,
    };

    try {
      const insert = "INSERT INTO product SET ?";
      conn.query(insert, productData, (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return res
            .status(500)
            .json({ status: 500, error: "Database insert error" });
        }
        return res.status(201).json({
          status: 201,
          message: "Product added successfully!",
          data: productData,
        });
      });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ status: 500, message: error.message });
    }
  });
};
