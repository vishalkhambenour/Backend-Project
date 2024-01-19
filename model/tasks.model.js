const {Schema,model} = require('mongoose')



let TaskSchema= new Schema({
    productname:{
        type:String,
        required:[true,"Productname is Mandatory"]
        
    },
    price:{
        type:Number,
        required:[true,"Price is Mandatory"]  
    },
    color:{
        type:String,
        required:[true,"color is Mandatory"]
    },
    createdby:{
        type:String,
        required:[true,"created by is mandatory"]
    
    }
},{timestamps:true})

module.exports=model("task",TaskSchema)