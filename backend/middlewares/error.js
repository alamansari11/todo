// Defining a custom error class that extends the built-in 'Error' class
class ErrorHandler extends Error {
  // Constructor for the custom error class
  // Takes 'message' and 'statusCode' as parameters
  constructor(message, statusCode) {
      // Calling the constructor of the parent 'Error' class with the provided 'message'
      super(message);
      
      // Setting additional properties for the custom error class
      this.statusCode = statusCode;
  }
}

//Whatever the error the above code throws the error the below middleware will handle it as we have set it in the app.js file as 
// app.use(errorMiddleware)

// Middleware function to handle errors
export const errorMiddleware = (err, req, res, next) => {
  // If no error message is provided, set a default internal server error message
  err.message = err.message || "Internal Server Error";

  // If no status code is provided, set a default status code of 500 (Internal Server Error)
  err.statusCode = err.statusCode || 500;

  // Returning a JSON response with the error details and status code
  return res.status(err.statusCode).json({
      success: false,
      message: err.message,
  });
};

// Exporting the custom error class for external use
export default ErrorHandler;
