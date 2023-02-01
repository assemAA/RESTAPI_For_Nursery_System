const express = require('express')
const childController = require('./../controllers/childController')
const childValidation = require('./../core/childValidation')
const checkValidations = require('./../core/checkValidations')
const authorization = require('./../core/Authorization/authorization')
const childRoute = express.Router();

childRoute.route('/children')
        .all(authorization.checkAdmin)
        .get(childController.getAllChilds)
        .post(childValidation.addNewChild ,
                checkValidations ,
               childController.addNewChild )
        .patch(childValidation.updateChild,
            checkValidations ,
            childController.updateChild)
        .delete(childValidation.deleteChild ,
            checkValidations ,
            childController.deleteChild)


childRoute.get('/children/:id' ,authorization.checkAdmin , childValidation.getChildByID , checkValidations , childController.getChildByID)


module.exports = childRoute ;


