module.exports.cookiesget=async (req,res,next)=>{
    const email = req.cookies.email || ''
    
    const password = req.cookies.password || ''
    const id = req.cookies.id || ''
    
    res.json({email:email,password:password,id:id})
    
    }
    
    
    module.exports.cookiesset=async (req,res,next)=>{
        const email = req.body.email || ''
        
        const password = req.body.password || ''
    
        res.cookie('email',email,{maxAge:60000})
        res.cookie('password',password,{maxAge:60000})
    
        res.json({email:email,password:password})
        
        }