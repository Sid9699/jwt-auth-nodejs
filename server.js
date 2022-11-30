const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jwt-auth-nodejs", () => {
  console.log("Connected to Mongo DB");
});

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
