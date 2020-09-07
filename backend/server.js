const express = require("express");
const app = express();
const database = require("./config/db");
const cookieParser = require("cookie-parser");

database();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.listen(6000, () => console.log("Server on port 6000"));
