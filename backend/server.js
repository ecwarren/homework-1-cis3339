const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found.' }));

// Serve the built Vue app (this folder doesn't exist until Phase 6)
const dist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(dist));
// SPA fallback so refreshing a page like /courses doesn't 404 (Express 5 syntax)
app.get('/{*splat}', (req, res) => res.sendFile(path.join(dist, 'index.html')));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set in .env');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  // Creates the collections and unique indexes automatically, even on an empty database
  await Promise.all([Student.init(), Course.init(), Enrollment.init()]);
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});