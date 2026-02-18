require("dotenv").config(); //loads all env to all files
const app = require("./app");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});