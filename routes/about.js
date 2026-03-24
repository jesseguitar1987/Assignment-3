"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", {
    pageTitle: "Information about this app",
    message:
      "This is an Express and EJS demo shows routing and a POST form that updates the home page using an in-memory store."
  });
});

module.exports = router;