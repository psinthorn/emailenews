const keys = require("./../configs/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("./../middleware/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charged = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "Charged from credit card",
      source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
