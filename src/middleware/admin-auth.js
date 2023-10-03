const jwt = require('jsonwebtoken')
const adminRegister = require('../models/admin-register');

async function adminAuth (req, res, next) {
    try {
        const token = req.cookies.authad;
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await adminRegister.find({ token: token }).count();
        if (user === 0) {
            res.status(200).json({ message: "notLogged" });
        } else {
            req.id = verify.id
            req.log = true;
            next();
        }
    } catch {
        res.status(200).json({ message: "notLogged" });
    }
}


module.exports = adminAuth