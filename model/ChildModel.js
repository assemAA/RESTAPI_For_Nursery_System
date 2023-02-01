const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)


const childSchema = new mongoose.Schema ({
    _id : {type : Number , required : true} ,
    fullName : {type : String , required : true} ,
    age : {type : Number , required : true} ,
    level : { 
        type : String  ,
        required : true ,
        enum : ["PreKG","KG1","KG2"]
            } ,
    address : {
        city : {
            type : String , default : "Tanta"
        } ,
        street : {
            type : String , default:"Tout Ank Amoun"
        } , 
        building : {
            type : Number , default : 55 
        }
    } 
} )



mongoose.model("childs" , childSchema)

