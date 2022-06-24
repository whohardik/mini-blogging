const { default: mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fname: {

      type: String,
      required: 'First Name is required',
      trim: true

    },

    lname: {

      type: String,
      required: 'Second Name is required',
      trim: true

    },

    title: {

      type: String,
      required: 'Title is required',
      enum: ["Mr", "Mrs", "Miss"],
      trim: true

    },

    email: {

      type: String,
      trim: true,
      required: 'Email address is required',
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email){
          return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
        }, message: 'Please Fill a valid Email Address.',
        isAsync: false
      }

    },

    password: {

      type: String,
      required: 'Password is required',
      trim: true

    },

  },{ timestamps: true });

module.exports = mongoose.model("Author", authorSchema);