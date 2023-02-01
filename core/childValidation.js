const {body , query , param} = require('express-validator')

module.exports.addNewChild = [
    
    body("fullName").isAlpha().withMessage(" full name must be string")
                    .isLength({max : 30}).withMessage("full name is less than or equal 30 chars") , 
    body("age").isInt().withMessage("age must be number ") , 
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage("level is not correct") , 
    body("address").isObject().withMessage("addres must be object"),
    body("address.city").isString().isLength({max : 30}).withMessage("city is string and at most 30 chars") ,
    body("address.street").isString().isLength({max : 30}).withMessage("street is string and at most 30 chars") ,
    body("address.building").isInt().withMessage("building is number") ,

]


module.exports.updateChild = [
    body("_id").isInt().withMessage(" child id must be exits ") ,
    body("fullName").optional().isAlpha().withMessage(" full name must be string")
    .isLength({max : 30}).withMessage("full name is less than or equal 30 chars")  , 
    body("age").optional().isInt().withMessage("age must be number ") , 
    body("level").optional().isIn(["PreKG","KG1","KG2"]).withMessage("level is not correct") , 
    body("address").optional().isObject().withMessage("addres must be object"),
    body("address.city").optional().isLength({max : 30}).isString().withMessage("city is string") ,
    body("address.street").optional().isLength({max : 30}).isString().withMessage("street is string") ,
    body("address.building").optional().isInt().withMessage("building is number") ,
]



module.exports.deleteChild = [
    body("_id").isInt().withMessage(" child id must be exits ") 
]


module.exports.getChildByID = [
    param("id").isInt().withMessage("child id must be exits and string") 
]
