const {body , param , query} = require('express-validator')

module.exports.addClassValidator = [
    body("name").isAlpha().withMessage("class name must be string")
                .isLength({max : 30}).withMessage("name must be equal or less than 30 chars"),
    body("supervisor").isMongoId().withMessage("class supervisor is object ID") ,
    body("children").isArray().withMessage("children in class must be in array") ,
    body("children[*]").isInt().withMessage("child id is integar"),
    body("children[*].*").isInt().withMessage("child id is integar")
]

module.exports.updateClassValidator = [
    body("id").isInt().withMessage("class id must be number ") ,
    body("name").optional().isAlpha().withMessage("class name must be string")
                .isLength({max : 30 }).withMessage("name must be equal or less than 30 chars"),
    body("supervisor").optional().isMongoId().withMessage("class supervisor is object ID") ,
    body("children").optional().isArray().withMessage("children in class must be in array") ,
    body("children[*]").optional().isInt().withMessage("child id is integar"),
    body("children[*].*").optional().isInt().withMessage("child id is integar")
]


module.exports.deleteClassValidator =  [ 
    body("id").isInt().withMessage("class id must be number ") ,
    
]

module.exports.getClassByIdValidation = [
    param("id").isInt().withMessage("class ID must be number")
]

module.exports.getClassChildrenByIdValidation = [
    param("id").isInt().withMessage("class ID must be number")
]

module.exports.getClassTeacherByIdValidation = [
    param("id").isInt().withMessage("class ID must be number")
]