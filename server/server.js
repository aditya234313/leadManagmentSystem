const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leads");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});