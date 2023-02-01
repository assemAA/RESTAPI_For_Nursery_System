const mongoose = require('mongoose')



const teacherSchema = new mongoose.Schema ( {

    _id : {type : mongoose.Schema.Types.ObjectId  } ,
    fullName : {type : String , required : true} , 
    password : {type : String , required : true} , 
    email : {type : String , required : true ,match :  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/} , 
    image : {type : String } 
})



mongoose.model("teachers" , teacherSchema) ;