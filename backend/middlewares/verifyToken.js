import jwt from "jsonwebtoken";
// verify Token
function verifyToken(req,res,next) {
    const token =  req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token,"secretKey1234")  
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message:"No token provided"}) 
        }
    } else {
        res.status(401).json({message:"No token provided"})
    }
}

// verify Token & Authorize the user

function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return res.status(403) // forbidden
            .json({message: "You are not allowed"}) // Unauthorized
        }
    } );
}

export {
    verifyToken,
    verifyTokenAndAuthorization,
}