const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "build"), {
  maxAge: "1y",
  lastModified: true,
}));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "home", "index.html"), {
    maxAge: "0",
  });
});

app.get("/faucet", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "faucet", "index.html"), {
    maxAge: "0",
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), {
    maxAge: "0",
  });
});

app.listen(5000, () => {
  console.log("Frontend Served on Port: 5000");
});
