const express = require('express');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const handleError = require('./handleError');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;   // these are MongoDB _id values
    if (!studentId || !courseId)
      return res.status(400).json({ error: 'Select both a student and a course.' });

    const [student, course] = await Promise.all([
      Student.findById(studentId), Course.findById(courseId),
    ]);
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    if (!course)  return res.status(404).json({ error: 'Course not found.' });

    const enrollment = await Enrollment.create({ student: student._id, course: course._id });
    res.status(201).json(enrollment);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Student is already enrolled in this course.' });
    handleError(res, err);
  }
});

module.exports = router;