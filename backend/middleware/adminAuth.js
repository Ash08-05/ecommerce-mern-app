import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // 3️⃣ Split Bearer token
    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization format",
      });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Check admin

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      console.log("❌ Not admin user");

      return res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (error) {
    console.log("❌ ADMIN AUTH ERROR:");
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default adminAuth;
