require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

const router = require("./routers");
const { errorHandler } = require("./middlewares");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app