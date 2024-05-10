const express = require("express");
const app = express();
const cors = require("cors");
const API_V = "/api/v1/";
const userRoutes = require("./Router/userRoutes");

app.use(express.json());
app.use(cors());
app.use(`${API_V}user`, userRoutes);

app.get("/", (req, res) => {
  res.send("<p>server is live<p>");
});

module.exports = app;
