import jwt from 'jsonwebtoken' 

// user authentication middleware 
// if we get the token when admin will login then admin is authenticated 

const authUser = async (req,res,next) => {
    try {
        const { token } = req.headers; 
        if(!token){
            return res.json({success:false, message:'Not Authorized Login Again'});   
        } 

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded_token.id
        next()  
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
} 

export default authUser