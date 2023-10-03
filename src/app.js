const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000
require("dotenv").config()
require(path.join(__dirname, "./db/dbCon"))
const cookieParser = require("cookie-parser")
const cors = require("cors")

const loginRouter = require("./routers/authentication/login")
const signupRouter = require("./routers/authentication/signup")
const logoutRouter = require("./routers/authentication/logout")
const authorization = require("./routers/authentication/authorization")

const createCatRouter = require("./routers/categories/create-cat")
const readCatRouter = require("./routers/categories/read-cat")
const updateCatRouter = require("./routers/categories/update-cat")
const deleteCatRouter = require("./routers/categories/delete-cat")

const createHeadCatRouter = require("./routers/header-cat/create-head-cat")
const deleteHeadCatRouter = require("./routers/header-cat/delete-head-cat")
const readHeadCatRouter = require("./routers/header-cat/read-head-cat")

const createProRouter = require("./routers/products/create-pro")
const readProRouter = require("./routers/products/read-pro")
const updateProRouter = require("./routers/products/update-pro")
const deleteProRouter = require("./routers/products/delete-pro")

const createOrderRouter = require("./routers/order/create-order")
const readOrderRouter = require("./routers/order/read-order")
const updateOrderRouter = require("./routers/order/update-order")
const deleteOrderRouter = require("./routers/order/delete-order")

const createDealRouter = require("./routers/deal/create-deal")
const readDealRouter = require("./routers/deal/read-deal")
const deleteDealRouter = require("./routers/deal/delete-deal")

const createContactRouter = require("./routers/contact/create-contact")
const readContactRouter = require("./routers/contact/read-contact")
const updateContactRouter = require("./routers/contact/update-contact")
const deleteContactRouter = require("./routers/contact/delete-contact")

const createCartRouter = require("./routers/cart/add-to-cart")

const adminLoginRouter = require("./routers/authentication/admin/ad-login")
const adminSignupRouter = require("./routers/authentication/admin/ad-signup")
const adminLogoutRouter = require("./routers/authentication/admin/ad-logout")
const adminAuthorization = require("./routers/authentication/admin/ad-authorization")

const aboutRouter = require("./routers/about/about")

const allowedOrigin = "http://localhost:5173"

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("hello world!")
})

// auth routes

app.use(loginRouter)
app.use(signupRouter)
app.use(logoutRouter)
app.use(authorization)

// cat routes

app.use(createCatRouter)
app.use(readCatRouter)
app.use(updateCatRouter)
app.use(deleteCatRouter)

// head-cat routes

app.use(createHeadCatRouter)
app.use(deleteHeadCatRouter)
app.use(readHeadCatRouter)

// product routes

app.use(createProRouter)
app.use(readProRouter)
app.use(updateProRouter)
app.use(deleteProRouter)

// order routes

app.use(createOrderRouter)
app.use(readOrderRouter)
app.use(updateOrderRouter)
app.use(deleteOrderRouter)

// deal routes

app.use(createDealRouter)
app.use(readDealRouter)
app.use(deleteDealRouter)

// contact routes

app.use(createContactRouter)
app.use(readContactRouter)
app.use(updateContactRouter)
app.use(deleteContactRouter)

// cart routes

app.use(createCartRouter)

// admin auth routes

app.use(adminLoginRouter)
app.use(adminSignupRouter)
app.use(adminLogoutRouter)
app.use(adminAuthorization)

// about router

app.use(aboutRouter)


app.listen(port, () => {
    console.log("Listening...")
})