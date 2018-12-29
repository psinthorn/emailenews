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
    if (!req.user) {
      res.status(200).send("Please singin");
    } else {
      res.send(req.user);
    }
  });

  app.get("/api/signout", (req, res) => {
    req.logout();
    res.status(200).send("You logout succcesfully");
  });

  // app.get("/auth/google/callback", (req, res) => {
  //   res.send({ sayHi: "Hello google this is my callback uri" });
  // });
};
