import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import complaintsrouter from "./routes/complaintsroute.js"
import userRouter from "./routes/usersroute.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(bodyParser.json())

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/complaints"

mongoose.connect(mongoUrl)
const connection = mongoose.connection
connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
})

app.use("/api/complaints", complaintsrouter)
app.use("/api/user", userRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})