const {Schema,model} = require('mongoose')



let informationSchema= new Schema({
    fullname:{
        type:String,
        required:[true,"Fullname is Mandatory"], 
        min:[3,"Fullname should beatleast 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]  
    },
    mobile:{
        type:String,
        required:[true,"Mobile is Mandatory"]
    },
    password:{
        type:String,
        required:[true,"Password is Mandatory"]
    },
    gender:{
        type:String,
        required:[true,"Gender is Mandatory"],
       enum:["Male","Female","Others"]
    },
    skills:[],
    // technical:{
    //     type:String,
    //     // required:true
    // },
    otp:{
        type:String,
        required:[true,"Otp is required"],
        default:"420"
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

module.exports=model("details",informationSchema)