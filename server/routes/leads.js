const express = require("express");
const router = express.Router();

const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadcontroller");

// Get all leads
router.get("/", getLeads);

// Create new lead
router.post("/", createLead);

// Update lead status
router.put("/:id", updateLead);

// Delete lead
router.delete("/:id", deleteLead);

module.exports = router;