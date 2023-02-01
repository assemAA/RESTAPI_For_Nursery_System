const {validationResult} = require('express-validator')

module.exports = (request , respose , next) => {
    let result = validationResult(request)
    
    if (result.errors.length == 0) {
        next()
    }else {
        let errorMessage = result.errors.reduce( (cur , obj  ) => cur+obj.msg + " , " , " ")
        
        let error = new Error(errorMessage);
        error.status = 422 ;
        next(error);
    }
}