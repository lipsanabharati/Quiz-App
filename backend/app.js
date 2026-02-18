const express = require("express");
const app = express();

app.use(express.json()); // IMPORTANT converts plain json text to js objects in the req body
app.use("/api/auth", require("./routes/authRoutes")); // api/auth/register page has the ability to register users
app.use("/api/quiz",require("./routes/quizRoutes")); // api/quiz shows all the quizes

module.exports = app;