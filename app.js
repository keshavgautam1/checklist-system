const express = require("express");
const axios = require("axios");
const rules = require("./config/rules");

const app = express();

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

// Fetch Data
async function fetchData() {
  try {
    const response = await axios.get(
      "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

// Evaluate Checklist
function evaluateChecklist(data) {
  return rules.map((rule) => ({
    name: rule.name,
    status: rule.condition(data) ? "Passed" : "Failed",
  }));
}

// Routes
app.get("/", async (req, res) => {
  const data = await fetchData();
  if (!data) {
    res.status(500).send("Error fetching data");
    return;
  }
  const results = evaluateChecklist(data);
  res.render("dashboard", { results });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
