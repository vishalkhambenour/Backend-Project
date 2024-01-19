const mongoose = require('mongoose')



let ConnectionDb=(url)=>{

    return mongoose.connect(url)

}
module.exports=ConnectionDb