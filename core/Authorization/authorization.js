const jwt = require('jsonwebtoken')

module.exports = (request , response , next) => {

    try {
        let token = request.get("authorization").split(" ")[1]
        let decodedToken = jwt.verify(token , process.env.EncryptionKey)
        request.role = decodedToken.role ;
        request.id = decodedToken.id
        next();
    }catch (err) {
        err.message="Not Authenticated";
        err.status=401;
        next(err);
    }
}

module.exports.checkAdmin = (request , response , next) =>{

    if (request.role == "admin") {
        next()
    }
    else {
        let error=new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}


module.exports.checkTeacher = (request,response , next) => {

    console.log(request)
    if (request.role == "teacher") {
       next()
    }
    else {
        let error=new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}


module.exports.checkAdminAndTeacher = (request , response , next) => {

    if (request.role == "teacher" || request.role == "admin") {
        next()
    }
    else {
        let error=new Error("Not Authorized");
        error.status=403;
        next(error);
    }


}