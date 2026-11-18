const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error('Division by zero is not allowed.');
    return a / b;
  },
};

function toNumber(value) {
  if (typeof value === 'string' && value.trim() === '') return NaN;
  return Number(value);
}

function calculate(operation, rawA, rawB) {
  const fn = operations[operation];
  if (!fn) throw new Error(`unknown operation "${operation}". Use add, subtract, multiply or divide.`);

  const a = toNumber(rawA);
  const b = toNumber(rawB);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('a and b must be valid numbers');
  }
  return { operation, a, b, result: fn(a, b) };
}

app.get('/add', (req, res) => {
  try {
    res.json(calculate('add', req.query.a, req.query.b));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/calc', (req, res) => {
  const { operation, a, b } = req.body || {};
  try {
    res.json(calculate(operation, a, b));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/calc/:operation/:a/:b', (req, res) => {
  const { operation, a, b } = req.params;
  try {
    res.json(calculate(operation, a, b));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Unknown API paths get a JSON 404 (static files are handled above).
app.use('/api', (req, res) => res.status(404).json({ error: 'no such endpoint' }));

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Could not start server on port ${PORT}: ${err.message}`);
    process.exit(1);
  }
  console.log(`Calculator server running at http://localhost:${PORT}`);
});

// Exported for testing.
module.exports = { calculate };
