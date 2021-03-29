const User = require("../models/Users");
const express = require('express');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const password = require('secure-random-password');

const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("198122039548-gp2a9kco71cun5re25frn67958jqlk2o.apps.googleusercontent.com")

const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    })
}

exports.register = async (req, res, next) => {
    let isCustomAuth;
    const { username, password, email, customAuth } = req.body;
    isCustomAuth = customAuth;
    try {
        let user;
        if (isCustomAuth) {
            user = await User.create({
                username, password, email
            });
        } else {
            user = await User.create({
                username, email
            });
        }

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // compare the password 
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid password", 401));
        } 

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
    
}

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off/>
        `

        // Sending the email to the user
        try {
            await sendEmail({
                to:user.email,
                subject: "Passwprd Reset Request",
                text: message
            });
            res.status(200).json({
                success:true, 
                data: "Email Sent"
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
    res.send("Forgot Password Route");
}

exports.resetpassword = async (req, res, next) => {
    const resetToken = req.params.resetToken;
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(201).json({
            success: true, 
            data: "Reset Password Success"
        })

        
    } catch (error) {
        next(error);
    }
}

exports.googleSignIn = async (req, res, next) => {
    const { token, profileObj } = req.body;
    // verify the token recieved - verifies if the token given by client and the token saved is the same 
    client
        .verifyIdToken({ idToken: token, audience: "198122039548-gp2a9kco71cun5re25frn67958jqlk2o.apps.googleusercontent.com"})
        .then(response => {
            const { email_verified, name, email, picture } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec(async (err, user) => {
                   if (err) {
                        return next(new ErrorResponse("Something went wrong ..", 400))
                   } else {
                       if (user) {
                            sendToken(user, 201, res);
                       } else {
                            try {
                                let newPassword = password.randomPassword({ length: 20, characters: [password.lower, password.upper, password.digits] });
                                let user = await User.create({ username: name, email, password: newPassword, profileImg: picture });
                                sendToken(user, 201, res);
                        
                            } catch (error) {
                                next(error);
                            }
                           

                       }
                   }
                })
            }
        });
}