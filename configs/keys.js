//prod
//916172311005 - anruia6uonkbd2shvfc4ci9e6mohch9d.apps.googleusercontent.com
//4v5NdBcTy0 - F2D046nY7wpV6
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
