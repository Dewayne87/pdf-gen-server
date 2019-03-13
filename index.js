require('dotenv').config();
  const express = require('express');
  const logger = require('morgan');
  const helmet = require('helmet');
  const cors = require('cors');
  const pdf = require('html-pdf');
  const pdfTemplate = require('./documents');
  const SERVER = express();
  const PORT = process.env.PORT || 5000

SERVER.use(express.json(), cors(), helmet(),logger("dev"));
// add a route for pdf creation
SERVER.post("/create-pdf", (req, res) => {
  const file = req.body;
  const options = {format: 'A4'}
  pdf.create(pdfTemplate(file, options), {}).toFile("documents/result.pdf", err => {
    if (err) {
      res.send(err);
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

SERVER.listen(PORT,() => {
  console.log(`Listening on PORT:${PORT}`);
});
