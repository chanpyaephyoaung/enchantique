export const resourceNotFound = (req, res, next) => {
   const errObj = new Error(`Resource not found - ${req.originalUrl}`);

   res.status(404);
   next(errObj);
};

export const errorHandler = (err, req, res, next) => {
   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   // console.log(err);
   let errMessage = err.message;

   // Check for Mongoose cast error
   if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      errMessage = "Resource not found! (Mongo Cast Error)";
   }

   res.status(statusCode).json({
      errMessage,
      errStack: process.env.NODE_ENV === "production" ? "" : err.stack,
   });
};
