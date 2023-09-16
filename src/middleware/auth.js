const express = require('express');
const router = new express.Router()
const jwt = require('jsonwebtoken')
const register = require('../models/register')

async function auth (req, res, next) {
    try {
        const token = req.cookies.auth;
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await register.find({ token: token }).count();
        if (user === 0) {
            res.status(200).json({ message: "notLogged" });
        } else {
            req.id = verify.id;
            req.log = true;
            next();
        }
    } catch {
        res.status(200).json({ message: "notLogged" });
    }
}


module.exports = auth