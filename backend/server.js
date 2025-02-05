const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let blockedSites = [];
let timeSpent = 0;

// Endpoint to get blocked sites
app.get('/blocked-sites', (req, res) => {
  res.json(blockedSites);
});

// Endpoint to add a blocked site
app.post('/blocked-sites', (req, res) => {
  const { site } = req.body;
  blockedSites.push(site);
  res.status(200).send('Site added');
});

// Endpoint to get time spent
app.get('/time-spent', (req, res) => {
  res.json({ timeSpent });
});

// Endpoint to update time spent
app.post('/time-spent', (req, res) => {
  const { seconds } = req.body;
  timeSpent += seconds;
  res.status(200).send('Time updated');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});