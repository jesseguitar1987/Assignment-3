var express = require("express");
var router = express.Router();
const Concert = require("../models/Concert");

// Home page that shows the form and submitted items
router.get("/", async function (req, res) {
  try {
    const concerts = await Concert.find().sort({ createdAt: -1 });

    res.render("index", {
      title: "Local Concert Lookup",
      concerts: concerts,
      errorMessage: null
    });
  } catch (err) {
    res.render("index", {
      title: "Local Concert Lookup",
      concerts: [],
      errorMessage: "Unable to load concerts."
    });
  }
});

// Handles the form submission
router.post("/add", function (req, res) {
  const title = (req.body.title || "").trim();
  const city = (req.body.city || "").trim();

  // Basic validation since both a concert title and city will be needed
  if (title.length === 0 || city.length === 0) {
    return res.status(400).render("index", {
      pageTitle: "Local Concert Lookup",
      entries: req.app.locals.items,
      errorMessage: "Both a concert title and city are required."
    });
  }

  req.app.locals.items.unshift({
    title,
    city,
    createdAt: new Date()
  });

  // Redirects the user back home so a pag refresh doesn't re-POST
  res.redirect("/");
});

module.exports = router;