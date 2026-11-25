const express = require('express');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const handleError = require('./handleError');
const router = express.Router();

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/students            -> all students
// GET /api/students?name=jo    -> case-insensitive partial name search
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: new RegExp(escapeRegex(name), 'i') } : {};
    res.json(await Student.find(filter).sort('name'));
  } catch (err) { handleError(res, err); }
});

router.post('/', async (req, res) => {
  try {
    const { name, studentId, phone, zip } = req.body;
    const student = await Student.create({ name, studentId, phone, zip });
    res.status(201).json(student);
  } catch (err) { handleError(res, err); }
});

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    await Enrollment.deleteMany({ student: student._id });   // cascade delete
    res.json({ message: 'Student deleted.' });
  } catch (err) { handleError(res, err); }
});

module.exports = router;