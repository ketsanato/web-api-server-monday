const User = require("../models/auth.models");
const jwt = require('jsonwebtoken');

module.exports.checkUser = async (req,res,next)=> {

    const token = req.cookies['id'];

 
     if(token){

        console.log("token start");
        const decoded= jwt.verify(token,process.env.JWT_SECRET, async  (err,decodedToken)=>{

            if(err){
                
return                res.json({status:false,messqge:"error check user"});

            }else{


                const user = await User.findById(decodedToken.id);

                if(user)
                return res.json({
                status:true,
                user:user.email
            });
        }
             
        })


     }else{

        res.json({status:false,message:"token is not "});
        next();
    }
}


module.exports.checkToken = async (req,res,next)=> {

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);


    if(user)

    return res.status(200).json({
    status:true,
    data:user
});



}  else {

return res.status(401).json({status:false,message:"Token is not "})


}

}
