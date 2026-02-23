const express = require("express");
const app = express();
const cors=require("cors");

app.use(express.json()); // IMPORTANT converts plain json text to js objects in the req body
app.use(cors({
    origin: "http://localhost:5173",//our frontend port
    credentials: true //this allows browser to send cookies
}))
app.use("/api/auth", require("./routes/authRoutes")); // api/auth/register page has the ability to register users
app.use("/api/quiz",require("./routes/quizRoutes")); // api/quiz shows all the quizes

module.exports = app;