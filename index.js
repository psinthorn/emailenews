const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./configs/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./models/User");
require("./services/passport");

//map global promise
//if not map this promise you will get some error warning when connect to mongoDB
mongoose.Promise = global.Promise;
//MongoDB connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
//aws.config.region = 'eu-west-1';

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    //this max age of cookie set to 30days
    // days * hour * second * minute * milisecond
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
  res.status(200).send({ say: "Hello to 2nd Edited" });
});

// #####################
// #*******************#
// # Routes section    #
// #####################

// #Traditional syntax
authRoutes(app);

// #es2015 syntax
require("./routes/billingRoutes")(app);

// ######################
// # End Routes Section #
// ######################

// or use syntaxt below for routes import and execute
//require("./services / passport")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("EmailEnews API Server is running on port: " + PORT);
});
