import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Not authorized, Login again"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: tokenDecode.id};
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

export default authMiddleware;