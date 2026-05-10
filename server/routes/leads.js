const router = require("express").Router();

const {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadcontroller");

router.get("/", getLeads);

router.post("/", addLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

module.exports = router;