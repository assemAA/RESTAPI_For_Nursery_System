const express = require("express") ;
const teacherRoute = require ('./routes/teacherRoute')
const childRoute = require('./routes/childRoute')
const classRoute = require('./routes/classRouter')
const authenticationRoute = require('./routes/authenticationRoute')
const authorizationMW = require('./core/Authorization/authorization')
const mongoose = require ('mongoose')
const morgan = require('morgan')


require('dotenv').config()

const server = express() ;
let port = process.env.PORT || 8080 ;



/// connection to dataBase 
mongoose.set( "strictQuery" , true)
mongoose.connect(process.env.DB_url)
        .then( ()=> {
            console.log("dataBase connected")
            
            server.listen(port , ()=> {
                console.log("hello from server port " , port);
            });
        })
        .catch( err => console.log(err))

//// first middleware layer  

server.use( (request , response , next) => {
     morgan( (tokens , req , res )=> {
        return [
            tokens.method(req , res) , 
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
    } , {immediate : true})

   next();
}  )

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
server.use(express.json()) 
server.use(authenticationRoute)
server.use(authorizationMW)
server.use(teacherRoute)
server.use(childRoute)
server.use(classRoute)

/// third layer not found 

server.use( (request , response , next) => {
    response.status(404).json({message : "page not found"})  ;
} )

/// fourth layer for handiling error midellware 

server.use( (error , request , response , next)=> {

    response.status(500).json({message : error + " " }) ;
} )