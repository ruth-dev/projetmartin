const express = require("express")
const userRoute = require("./routes/user.routes")
const cors = require("cors")
const cookieParser = require('cookie-parser');

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/user", userRoute)

app.listen(4000, () => console.log("Server on"))