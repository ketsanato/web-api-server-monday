const userModels = require("../models/auth.models");
const jwt=require('jsonwebtoken');
const maxAge=60000;


const createToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:maxAge,})
};



const handleError=(err)=>{


    let errors = {email:"",password:""};


    if(err.message === "incorrect Email") errors.email="That email is not registered";


    if(err.message === "incorrect password") errors.password="That password is incorrect";


    if(err.code === 11000){

        errors.email="Email is alread registered!!";
        return errors;
    }

    if(err.message.includes("Users validation failed")){

        Object.values(err.errors).forEach(({properties})=>{

            errors[properties.path]=properties.message;
            
        })
    }
    return errors;
}



module.exports.register=async (req,res,next)=>{
    try{
        
        const {email,password}=req.body;
        
        const user = await userModels.create({email,password});
        
        const token =createToken(user._id);

        res.cookie("id",token,{
            withCredent:true,
            httpOnly:false,
            maxAge:60000,
        
        }
        );
        
        res.status(201).json({user:user._id,created:true});
        
        
            }catch(err){

        console.log(err.message);

        const errors = handleError(err);
        res.json({errors,created:false});

            }
};

module.exports.login =async (req,res,next)=>{
    try{

const {email,password}=req.body;

const user = await userModels.login(email,password);


if(user){

const token =createToken(user._id);


res.cookie("id",token,{
    withCredent:true,   
    httpOnly:true,
    maxAge:60000,

}
);


return res.status(200).json({
    status:true,
    message:"login success",
user:user._id,
token:token});

}


    }catch(err){

console.log(err.message);
const errors = handleError(err);
res.json({errors,created:false});


    }
}