const express = require('express')
const mongose = require('mongoose')
const UUID = require('bson')
require('./../model/TeacherModel')

const TeacherSchema = mongose.model("teachers")


module.exports.getAllTeachers = (request , response , next)=> {

    TeacherSchema.find({})
                .then( (data) => {
                    response.status(200).json({data })
                } )
                .catch (err => {
                    next(err)
                })
}

module.exports.addNewTeacher = (request , response , next) => {

    let teacherObject = new TeacherSchema ({
         _id : new  mongose.Types.ObjectId() ,
        fullName : request.body.fullName ,
        password : request.body.password ,
        email : request.body.email ,
        image : request.body.image 

    })
    
    teacherObject.save()
                .then( (data) => response.status(201).json({data}) )
                .catch(err => next(err))

   
}

module.exports.updateTeacher = (request , response , next)=> {

    
    if (request.id == request.body._id || request.role == "admin") {
        TeacherSchema.updateOne({_id: request.body._id} , {
        
            $set : request.body
        }).then (data => response.status(200).json({data : "data updated"}))
        .catch (err => next(error))    
    }
    else {
        let error = new Error ()
        error.status = 401 
        error.message = "updated data not avilable"
        next(error)
    }
    

    
}

module.exports.deleteTeacher = (request , response , next) => {
    TeacherSchema.deleteOne ({_id : request.body._id})
                    .then( data => response.status(200).json("data deleted"))
                    .catch( err => next(err))
    
}