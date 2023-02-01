const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const TeachersSchema = mongoose.model("teachers");

module.exports.login = (request, response, next) => {
  if (request.body.userName == "admin" && request.body.password == "123") {
    let token = jwt.sign(
      {
        role: "admin",
        id: 1,
        userName: "admin",
      },
      process.env.EncryptionKey,
      { expiresIn: "1h" }
    );

    response.status(200).json({ data: "logging admin", token });
  } else {
    TeachersSchema.findOne({
      fullName: request.body.userName,
      password: request.body.password
    })
      .then((data) => {
        if (data == null) {
          let error = new Error();
          error.message = "authetication feild";
          error.status = 401;
          next(error);
        } else {
          let token = jwt.sign(
            {
              role: "teacher",
              id: data._id,
              userName: data.fullName,
            },
            process.env.EncryptionKey,
            { expiresIn: "1h" }
          );
          response.status(200).json({ data: "logging teacher", token });
        }
      })
      .catch((err) => next(err));
  }
};
