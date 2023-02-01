const express = require('express');
const mongoose = require('mongoose');
require('./../model/ChildModel');

const ChildSchema = mongoose.model("childs") 
module.exports.getAllChilds = (request , response , next) => {
    
    ChildSchema.find({})
                .then ( data => response.status(200).json({data}))
                .catch(err => next(err))
    
}

module.exports.addNewChild = (request , response , next) => {
    
    let childObject = new ChildSchema({
        _id : request.body._id ,
        fullName : request.body.fullName ,
        age : request.body.age ,
        level : request.body.level ,
        address : request.body.address
    })

    childObject.save()
                .then( data => response.status(201).json(data))
                .catch(err => next(err))
}

module.exports.updateChild = (request , response , next) => {

    ChildSchema.updateOne({_id: request.body._id} , {
        
        $set : request.body
    }).then (data => response.status(200).json({data : "data updated"}))
    .catch (err => next(error))

    
}

module.exports.deleteChild = (request , response , next) => {
    ChildSchema.deleteOne ({_id : request.body._id})
                    .then( data => response.status(200).json("data deleted"))
                    .catch( err => next(err))
}

module.exports.getChildByID = (request , response , next) => {
    ChildSchema.findOne({_id : request.params.id} )
                .then ( data => {
                    if (data == null) 
                        throw new Error ('data not found')
                    else 
                        response.status(200).json({data})
                })
                .catch (err => next(err))
}