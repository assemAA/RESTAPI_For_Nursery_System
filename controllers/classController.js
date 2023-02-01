const express = require("express");
const mongoose = require("mongoose");
require("./../model/ClassModel");

const ClassSchema = mongoose.model("class");
const TeacherSchema = mongoose.model("teachers");
const ChildSchema = mongoose.model("childs");

module.exports.getAllClasses = (request, response, next) => {
  ClassSchema.find({})
    .populate({ path: "supervisor", select: { fullName: 1, email: 1, _id: 0 } })
    .populate({ path: "children", select: { _id: 0 } })
    .then((data) => response.status(200).json({ data }))
    .catch((err) => next(err));
};

module.exports.addNewClass = (request, response, next) => {
  TeacherSchema.findOne({ _id: request.body.supervisor })
    .then((data) => {
      if (data == null) {
        throw new Error("supervisor is not in database");
      } else {
        ChildSchema.find({ _id: { $in: request.body.children } })
          .count()
          .then((chData) => {
            if (chData == request.body.children.length) {
              let classObject = new ClassSchema({
                name: request.body.name,
                supervisor: request.body.supervisor,
                children: request.body.children,
              });

              classObject
                .save()
                .then((data) => response.status(201).json(data))
                .catch((err) => next(err));
              response.status(201).json({ data: "add new class" });
            } else {
              throw new Error("child is not in database and  is invalid");
            }
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

module.exports.upateClass = (request, response, next) => {
  ///// validation on supervisor and child
  if (request.body.supervisor && request.body.children) {
    TeacherSchema.findOne({ _id: request.body.supervisor })
      .then((data) => {
        if (data == null) {
          throw new Error("supervisor not found");
        } else {
          ChildSchema.find({ _id: { $in: request.body.children } })
            .count()
            .then((chdata) => {
              if (chdata == request.body.children.length) {
                ClassSchema.updateOne(
                  { _id: request.body.id },
                  {
                    $addToSet: { children: request.body.children },
                    $set: {
                      name: request.body.name,
                      supervisor: request.body.supervisor,
                    },
                  }
                )
                  .then((data) =>
                    response.status(200).json({ data: "data updated" })
                  )
                  .catch((err) => next(error));
              } else {
                throw new Error("child is not valid is not in data base");
              }
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  }

  /////////////////////////  validation on supervisor only
  else if (request.body.supervisor && !request.body.children) {
    TeacherSchema.findOne({ _id: request.body.supervisor })
      .then((data) => {
        if (data == null) {
          throw new Error(" supervisor not found ");
        } else {
          ClassSchema.updateOne(
            { _id: request.body.id },
            {
              $set: request.body,
            }
          )
            .then((data) => response.status(200).json({ data: "data updated" }))
            .catch((err) => next(error));
        }
      })
      .catch((err) => next(err));
  }

  /////////////////////// validation on childs only
  else if (!request.body.supervisor && request.body.children) {
    ChildSchema.find({ _id: { $in: request.body.children } })
      .count()
      .then((chdata) => {
        if (chdata == request.body.children.length) {
          ClassSchema.updateOne(
            { _id: request.body.id },
            {
              $addToSet: { children: request.body.children },
              $set: {
                name: request.body.name,
                supervisor: request.body.supervisor,
              },
            }
          )
            .then((data) => response.status(200).json({ data: "data updated" }))
            .catch((err) => next(error));
        } else {
          throw new Error("child is not valid is not in data base");
        }
      })
      .catch((err) => next(err));
  }

  //////////////////////////
  //// not supervisor or childs
  else {
    ClassSchema.updateOne(
      { _id: request.body.id },
      {
        $set: request.body,
      }
    )
      .then((data) => response.status(200).json({ data: "data updated" }))
      .catch((err) => next(error));
  }
};

module.exports.deleteClass = (request, response, next) => {
  ClassSchema.deleteOne({ _id: request.body.id })
    .then((data) => response.status(200).json("data deleted"))
    .catch((err) => next(err));
};

module.exports.getClassById = (request, response, next) => {
  
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "supervisor", select: { fullName: 1, email: 1, _id: 1 } })
    .populate({ path: "children", select: { _id: 0 } })
    .then((data) => {
      if (data == null) throw new Error("data not found");
      if (request.id == data.supervisor._id || request.role == "admin") response.status(200).json({ data })
      else throw new Error(" not authonticated ");
    })
    .catch((err) => next(err));
};

module.exports.getClassChildrenById = (request, response, next) => {
  ClassSchema.findOne(
    { _id: request.params.id },
     { _id: 0, name: 0 }
  )
    .populate({
      path: "children",
      select: { fullName: 1, age: 1, level: 1, address: 1 },
    })
    .then((data) => {
      if (data == null) throw new Error("data not found");
      if (request.id == data.supervisor || request.role == "admin") response.status(200).json({ data })
      else throw new Error(" not authonticated ");
    })
    .catch((err) => next(err));
};

module.exports.getClassTeacherById = (request, response, next) => {
  ClassSchema.findOne(
    { _id: request.params.id },
    { _id: 0, name: 0, children: 0 }
  )
    .populate({ path: "supervisor", select: { fullName: 1, email: 1 } })
    .then((data) => {
      if (data == null) throw new Error("data not found");
      else response.status(200).json({ data });
    })
    .catch((err) => next(err));
};
