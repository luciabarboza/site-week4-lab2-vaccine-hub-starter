const express = require("express"); //Import the Express.js framework
const cors = require("cors"); // Import the CORS middleware
const morgan = require("morgan"); // Import the Morgan middleware for logging

const {BadRequestError, NotFoundError} = require("./utils/errors")

const app = express();


app.use(cors()); // Enable CORS middleware to handle cross-origin requests

app.use(express.json())

app.use(morgan("tiny")); // Use Morgan middleware with 'dev' format for request logging

app.use((req,res,next)=>{
  return next (new NotFoundError())
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: {message, status},
  })
})

const PORT = process.env.PORT || 3001 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});