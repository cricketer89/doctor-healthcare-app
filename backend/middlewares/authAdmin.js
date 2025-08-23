import jwt from 'jsonwebtoken' 

// admin authentication middleware 
// if we get the token when admin will login then admin is authenticated 

const authAdmin = async (req,res,next) => {
    try {
        const { atoken } = req.headers; 
        if(!atoken){
            res.json({success:false, message:'Not Authorized Login Again'});
        } 

        const decoded_token = jwt.verify(atoken, process.env.JWT_SECRET);

        if(decoded_token !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)){
            res.json({success:false, message:'Not Authorized Login Again'});
        }

        next() 
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
} 

export default authAdmin