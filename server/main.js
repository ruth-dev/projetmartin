const express = require("express")
const userRoute = require("./routes/user.routes")
const linksRoute = require("./routes/links.routes")
const cors = require("cors")
const cookieParser = require('cookie-parser');
require("dotenv").config({path: "./config/.env"})

const app = express()

// Middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/user", userRoute)
app.use("/api/links", linksRoute)

app.listen(4000, () => console.log("Server on"))