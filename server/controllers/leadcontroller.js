const pool = require("../db");

const getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addLead = async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    if (!name || !phone || !source) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO leads (name, phone, source) VALUES ($1,$2,$3) RETURNING *",
      [name, phone, source]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM leads WHERE id=$1",
      [id]
    );

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
};