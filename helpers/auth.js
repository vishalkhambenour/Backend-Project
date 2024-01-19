const  jwt= require('jsonwebtoken');


let auth =(req,res,next)=>{

    try {

        let Mytoken=req.headers.authorization;
        if(!Mytoken || !Mytoken.startsWith("Bearer")){

            return res.status(406).json({error:true,message:"Token required"})
        }else{
            
            let token=Mytoken.split(" ")[1]
            let decoded=jwt.verify(token,"vishalsk")
            req.fullname=decoded.fullname
           next()
        }        
    } catch (err) {
        next(err)
    }
}

module.exports=auth