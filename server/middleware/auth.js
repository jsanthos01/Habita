const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/Users");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("198122039548-gp2a9kco71cun5re25frn67958jqlk2o.apps.googleusercontent.com")

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const isCustomAuth = token.length < 500;
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // custom auth or google token auth
    let decoded; 
    let userID;
    let user;
    if (token && isCustomAuth) {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      userID = decoded.id;
      user = await User.findById(userID);
    } else {
      decoded = jwt.decode(token);
      console.log( "decoded", decoded)
      if (decoded.email_verified) {
        user = User.findOne({ email: decoded.email })
      }
    }

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};