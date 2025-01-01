
const userTypeModels = require("../models/usertype.models");



module.exports.createUserType=async (req,res,next)=>{
const form = req.body;
const data = {
    user_type_name:form.user_type_name,
    created_date:new Date()


}

userTypeModels.create(data,err=>{

    if(!err){
        console.log("Save");
        res.json({
            status:true,
            message:"Saved"


        })
    }else{
        console.log("error ");

        res.json({
            status:false,
            message:err


        })
    }
})
}


module.exports.readUserType=async (req,res,next)=>{
    userTypeModels.find().exec((err,data)=>{
    if(!err){

        res.json({
            status:true, 
            message:"selete all data ",
        data:data
    })
    }else{


        console.log("error");
        res.json({
            status:false,
        message:err
    })
    }
  });
        
    }

    module.exports.updateUsertype=async (req,res,next)=>{
        const form = req.body;
        const data = {
            user_type_name:form.user_type_name,
            updated_date:new Date()

        }        
        console.log(form);
        userTypeModels.findByIdAndUpdate(form._id,data,{useFindAndModify:false}).exec((err,data)=>{

            if(!err){
        console.log("Updatwe Sucess  ");

                res.json({
                    status:true,
                message:"Update Sucess !",
                data:data
                
                })
      
            }else{
                console.log("error");

          res.json({
                    status:false,
                message:err})


            }
        })



    }


    
    module.exports.deleteUserType=async (req,res,next)=>{

        const form = req.body; 
   
        
        userTypeModels.findByIdAndDelete(form._id,{useFindAndModify:false}).exec((err)=>{

            if(!err){
        console.log("Delete Sucess  ");

                res.json({
                    status:true,
                message:"Delete Sucess !",
           
                })
      
            }else{
                console.log(" Delete error");

          res.json({
                    status:false,
                message:err})


            }
        })



    }