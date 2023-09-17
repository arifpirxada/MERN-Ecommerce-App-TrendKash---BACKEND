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

const allowedOrigin = "http://localhost:5173" 

app.use(cors({
    origin: allowedOrigin
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



app.listen(port, () => {
    console.log("Listening...")
})