// const mongoose = require("mongoose");

// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Role"
//       }
//     ],
//     isInitialAdmin: {
//       type: Boolean,
//       default: false
//     }
//   })
// );

// module.exports = User;
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    isInitialAdmin: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  })
);

module.exports = User;
