const express = require('express')
const classController = require('./../controllers/classController')
const classValidation = require("./../core/classValidation")
const checkValidation = require('./../core/checkValidations')
const autherization = require('./../core/Authorization/authorization')

const classRouter = express.Router();

classRouter.route('/class')
            .all(autherization.checkAdmin)
            .get(classController.getAllClasses)
            .post(classValidation.addClassValidator ,
                checkValidation ,
                classController.addNewClass)
            .patch(classValidation.updateClassValidator ,
                checkValidation ,
                classController.upateClass)
            .delete(classValidation.deleteClassValidator ,
                checkValidation , 
                classController.deleteClass)


classRouter.get('/class/:id' ,autherization.checkAdminAndTeacher  ,  classValidation.getClassByIdValidation , checkValidation , 
                classController.getClassById)


classRouter.get('/classchildern/:id' ,autherization.checkAdminAndTeacher , classValidation.getClassChildrenByIdValidation 
            , checkValidation ,
                classController.getClassChildrenById)


classRouter.get('/classTeacher/:id' ,autherization.checkAdmin,  classValidation.getClassTeacherByIdValidation 
        , checkValidation , classController.getClassTeacherById)


module.exports = classRouter ;