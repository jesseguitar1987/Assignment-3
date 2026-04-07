const express = require("express");
const router = express.Router();
const concertService = require("../../services/concertService");

// GET all
router.get("/", async (req, res) => {
  const concerts = await concertService.list();
  res.status(200).json(concerts);
});

// GET one
router.get("/:id", async (req, res) => {
  try {
    const concert = await concertService.find(req.params.id);

    if (!concert) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(concert);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { title, city, venue } = req.body;

  if (!title || !city) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newConcert = await concertService.create({ title, city, venue });
  res.status(201).json(newConcert);
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const updated = await concertService.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await concertService.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

module.exports = router;