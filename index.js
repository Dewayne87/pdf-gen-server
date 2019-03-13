require('dotenv').config();
const express = require("express"),
  SERVER = express(),
  cors = require("cors"),
  logger = require("morgan"),
  helmet = require("helmet"),
  PORT = process.env.PORT,
  pdf = require('html-pdf');

SERVER.use(express.json(), cors(), logger("dev"), helmet());
// add a route for pdf creation
SERVER.post("/create-pdf", (req, res) => {
  const file = req.body;
  pdf.create(pdfTemplate(file), {}).toFile("documents/result.pdf", err => {
    if (err) {
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

// add a route for generating pdf for client
SERVER.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/documents/result.pdf`);
});

SERVER.get('/', (req,res) => {
  res.json({message: "Running"})
})

SERVER.listen(() => {
  console.log(`Listening on PORT:${PORT}`);
});
