const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

mongoose.model("user", userSchema, "users");
// module.exports = User;