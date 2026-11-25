const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const handleError = require('./handleError');
const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await Course.find().sort('courseId')); }
  catch (err) { handleError(res, err); }
});

router.post('/', async (req, res) => {
  try {
    const { courseId, name } = req.body;
    res.status(201).json(await Course.create({ courseId, name }));
  } catch (err) { handleError(res, err); }
});

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    await Enrollment.deleteMany({ course: course._id });     // cascade delete
    res.json({ message: 'Course deleted.' });
  } catch (err) { handleError(res, err); }
});

// Roster: all students enrolled in one course
router.get('/:id/students', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    const enrollments = await Enrollment.find({ course: course._id }).populate('student');
    res.json(enrollments.map(e => e.student).filter(Boolean));
  } catch (err) { handleError(res, err); }
});

module.exports = router;