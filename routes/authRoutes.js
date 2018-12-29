const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    console.log(req.session);
    if (!req.user) {
      res.status(200).send("Please Sing in");
    } else {
      res.send(req.user);
    }
  });

  app.get("/api/signout", (req, res) => {
    req.logout();
    res.status(200).send("You logout succcesfully");
  });

  app.get("/env", (req, res) => {
    console.log(process.env.MONGO_URI);
    console.log(process.env.GOOGLE_CLIENT_ID);
    console.log(process.env.GOOGLE_SECRET_KEY);
  });

  // app.get("/auth/google/callback", (req, res) => {
  //   res.send({ sayHi: "Hello google this is my callback uri" });
  // });
};
