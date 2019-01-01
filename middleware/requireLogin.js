module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ error: "Please Sign in to continue" });
  }
  next();
};
