const express = require("express");
const mongoose = require("mongoose");
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

authRoutes(app);

// or use syntaxt below for routes import and execute
//require("./services / passport")(app);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("EmailEnews API Server is running on port: " + PORT);
});
