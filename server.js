const express = require("express");
const cors = require("cors");

const app = express();

const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
