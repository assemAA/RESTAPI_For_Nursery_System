const express = require('express')
const teacherController = require('./../controllers/teacherController') ;
const teacherValidation = require('./../core/teacherValidator');
const checkValidations = require('./../core/checkValidations')
const authorization = require('./../core/Authorization/authorization')


const teacherRoute = express.Router();

teacherRoute.route("/teachers")
            .get(authorization.checkAdmin , teacherController.getAllTeachers)
            .post(authorization.checkAdmin , teacherValidation.addTeacherValidator ,
                checkValidations 
                , teacherController.addNewTeacher)
            .delete(authorization.checkAdmin , teacherValidation.deleteTeacher,
                checkValidations , 
                teacherController.deleteTeacher)


teacherRoute.patch('/teachers' , authorization.checkAdminAndTeacher ,  teacherValidation.updateTeacherValidator , 
    checkValidations , 
    teacherController.updateTeacher)

module.exports = teacherRoute ; 