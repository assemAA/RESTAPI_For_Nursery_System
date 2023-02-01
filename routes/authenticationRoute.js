const express = require ('express')

const authenticationController = require('./../controllers/authenticationController')

const authenticationRouter = express.Router() ;

authenticationRouter.route("/login")
                    .post(authenticationController.login)





module.exports = authenticationRouter ;