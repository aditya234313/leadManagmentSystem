const pool = require("../config/db");

// Get all leads
const getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log("GET ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Create new lead
const createLead = async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    const result = await pool.query(
      "INSERT INTO leads (name, phone, source, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, phone, source, "New"]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update lead status
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE leads SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.json({
      message: "Lead updated successfully",
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM leads WHERE id = $1",
      [id]
    );

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
};