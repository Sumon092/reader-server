const express = require("express");
const cors = require("cors");
const userRoutes = require("./app/module/user/user.route.js");
const bookRoutes = require("./app/module/book/book.route.js");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("book server is running");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);

module.exports = app;
