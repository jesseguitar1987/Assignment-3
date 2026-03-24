var express = require("express");
var router = express.Router();
var Concert = require("../models/Concert");

// Post
router.post("/add", async function (req, res) {
  try {
    const title = (req.body.title || "").trim();
    const city = (req.body.city || "").trim();
    const venue = (req.body.venue || "").trim();

    if (title.length === 0 || city.length === 0) {
      const concerts = await Concert.find().sort({ createdAt: -1 });

      return res.status(400).render("index", {
        title: "Local Concert Lookup",
        concerts: concerts,
        errorMessage: "Both title and city are required."
      });
    }

    await Concert.create({
      title: title,
      city: city,
      venue: venue
    });

    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error creating concert.");
  }
});

// Edit
router.get("/edit/:id", async function (req, res) {
  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      return res.status(404).send("Concert not found.");
    }

    res.render("edit", {
      title: "Edit Concert",
      concert: concert,
      errorMessage: null
    });
  } catch (err) {
    res.status(500).send("Error loading edit form.");
  }
});

// Update
router.post("/update/:id", async function (req, res) {
  try {
    const title = (req.body.title || "").trim();
    const city = (req.body.city || "").trim();
    const venue = (req.body.venue || "").trim();

    if (title.length === 0 || city.length === 0) {
      const concert = await Concert.findById(req.params.id);

      return res.status(400).render("edit", {
        title: "Edit Concert",
        concert: concert,
        errorMessage: "Both title and city are required."
      });
    }

    await Concert.findByIdAndUpdate(req.params.id, {
      title: title,
      city: city,
      venue: venue
    });

    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating concert.");
  }
});

// Delete
router.post("/delete/:id", async function (req, res) {
  try {
    await Concert.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting concert.");
  }
});

module.exports = router;