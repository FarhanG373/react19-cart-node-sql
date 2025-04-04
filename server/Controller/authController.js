import bcrypt from "bcryptjs";
import { conn } from "../DB/DB.js";
import jwt from "jsonwebtoken";

export const registor = (req, res) => {
  const { fname, uName, email, pNumber, password } = req.body;

  if (!fname || !uName || !email || !pNumber || !password) {
    return res
      .status(400)
      .json({ status: 400, error: "All fields are required" });
  }

  const selectQuery = "SELECT * FROM userdetail WHERE email=?";
  conn.query(selectQuery, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res
        .status(409)
        .json({ status: 409, error: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO userdetail (userName, name, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)";
      conn.query(
        insertQuery,
        [uName, fname, email, hashedPassword, pNumber],
        (err) => {
          if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ error: "Database insert error" });
          }
          res
            .status(201)
            .json({ status: 201, message: "User Added successfully!" });
        }
      );
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

export const loginUser = (req, res) => {
  const select = `SELECT * FROM userdetail WHERE email=?`;
  conn.query(select, [req.body.email], (err, results) => {
    if (err) {
        throw err;
      } else if (!results || results.length === 0) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
      const match = bcrypt.compareSync(req.body.password, results[0].password);
      if (!match) {
        return res.status(401).json({ status: 401, message: "Invalid password" });
      }
      const token = jwt.sign({ id: results[0].id, userName: results[0].userName, name: results[0].name }, "secretkey", {
        expiresIn: "1h",
      });
      return res.json({
        status: 200,
        message: "Logged in successfully",
        token,
      });
  });
};
