const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send({ say: "Hello" });
});

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("EmailEnews API Server is running on port: " + PORT);
});
