const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    tags: {
  type: [String],
  default: [],
},

isDeleted: {
  type: Boolean,
  default: false,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);