const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();

const port = process.env.PORT || 4000;

// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Backend Server listening at ${port}`);
});

module.exports = app;
