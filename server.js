const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
var bodyParser = require("body-parser");

connectDB();

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/emp", require("./routes/employRoute"));

const port = process.env.PORT;

app.listen(port, () => console.log(`started on ${port}`));
