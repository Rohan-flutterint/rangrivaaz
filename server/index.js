const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');

function readJSON(name){
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8')); } catch (e) { return []; }
}

app.get('/api/venues', (req, res) => { res.json(readJSON('venues.json')); });
app.get('/api/vendors', (req, res) => { res.json(readJSON('vendors.json')); });
app.get('/api/categories', (req, res) => {
  const venues = readJSON('venues.json');
  const vendors = readJSON('vendors.json');
  const cats = new Set();
  venues.forEach(v=>v.tags?.forEach(t=>cats.add(t)));
  vendors.forEach(v=>cats.add(v.category));
  res.json(Array.from(cats));
});
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const venues = readJSON('venues.json');
  const vendors = readJSON('vendors.json');
  const combined = [...venues, ...vendors];
  const out = combined.filter(d => {
    return (d.name && d.name.toLowerCase().includes(q)) ||
           (d.short_description && d.short_description.toLowerCase().includes(q)) ||
           ((d.tags||[]).join(' ').toLowerCase().includes(q)) ||
           ((d.category||'').toLowerCase().includes(q));
  });
  res.json(out);
});
app.post('/api/checkout', (req, res) => {
  const order = req.body;
  console.log('Received demo checkout', order);
  res.json({status:'ok', message:'demo checkout received'});
});

// serve client build if exists
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('RangRivaaz API listening on', port));
