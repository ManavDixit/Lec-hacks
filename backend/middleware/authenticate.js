import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authenticate = (req, res, next) => {
  const { token } = req.body;
  console.log(req.body);
  try {
    if(!token) return res.status(400).json({success:false,error:'you must be logged-in'})
    const jwtPayload = jwt.verify(token, process.env.SECRET_AUTH_KEY);
    req.id=jwtPayload.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
export default authenticate;
