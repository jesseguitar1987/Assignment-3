const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    venue: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true } // ✅ correct placement
);

module.exports = mongoose.model("Concert", concertSchema);