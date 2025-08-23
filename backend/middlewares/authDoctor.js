import jwt from 'jsonwebtoken' 

// doctor authentication middleware 
// if we get the token when admin will login then admin is authenticated   

const authDoctor = async (req,res,next) => {
    try {
        const { dtoken } = req.headers; 
        if(!dtoken){
            return res.json({success:false, message:'Not Authorized Login Again'});   
        } 

        const decoded_token = jwt.verify(dtoken, process.env.JWT_SECRET); 
        req.body.docId = decoded_token.id
        next()  
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
} 

export default authDoctor