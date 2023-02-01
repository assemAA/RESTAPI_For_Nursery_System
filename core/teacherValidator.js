const express = require('express')
const {body , param , query} = require('express-validator')

module.exports.addTeacherValidator = [
    body("fullName").isAlpha().withMessage("teacher name must be string")
                    .isLength({max : 30}).withMessage("full name must be less than or equal 30 chars") ,
    body("password").isStrongPassword().isLength({min : 8}).withMessage("password is string") ,
    body("email").isEmail().isLength({max:30}).withMessage("teacher mail must be email"),
    body("image").isString().isLength({max:40}).withMessage("image path must be string")
]

module.exports.updateTeacherValidator = [
    body("_id").isMongoId().withMessage("teacher is must be entered") , 
    body("fullName").optional().isAlpha().withMessage("teacher name must be string") 
                    .isLength({max : 30}).withMessage("full name must be less than or equal 30 chars") ,
    body("password").optional().isLength({max:30}).isString().withMessage("password is string") ,
    body("email").optional().isLength({max:30}).isEmail().withMessage("teacher mail must be email"),
    body("image").optional().isLength({max:40}).isString().withMessage("image path must be string")
]


module.exports.deleteTeacher = [
    body("_id").isMongoId().withMessage("teacher is must be entered") , 
]