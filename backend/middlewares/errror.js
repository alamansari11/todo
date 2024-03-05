

class ErrorHandler extends Error {
    constructors(message,statusCode) {
       this.message = message;
        this.statusCode = statusCode;
    }
}
export const errorMiddleware = (err,req,res,next)=>{
    //if no error is given
    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
      success: false,
      message:err.message
    });
  };

export default ErrorHandler;