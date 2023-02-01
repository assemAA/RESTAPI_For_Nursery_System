const mongoose = require('mongoose')
const autoIncrementClass = require('mongoose-sequence')(mongoose)



const classSchema = new mongoose.Schema ({
    _id : {type :Number} ,
    name : {type : String , required : true} ,
    supervisor : {type : mongoose.Types.ObjectId , required : true , ref : "teachers"} ,
    children : [{type : Number , ref : "childs"}]
} , {_id : false})


classSchema.plugin(autoIncrementClass , {inc_field: '_id'});

mongoose.model("class" , classSchema)

