let customApiError=(message,statuscode)=>{
   

    let customError=new Error(message)
    customError.statuscode=statuscode
    // console.log(customError);
    return customError
}

module.exports=customApiError