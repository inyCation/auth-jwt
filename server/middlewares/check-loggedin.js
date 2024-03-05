import jwt from "jsonwebtoken";

export const checkLoggedIn = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded._id;
    next();
  } catch (error) {
    
    return res.status(400).json({ success: false, message: 'Invalid token', error: error.message });
  }
}