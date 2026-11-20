const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: [true, 'Course ID is required.'], trim: true, unique: true },
  name:     { type: String, required: [true, 'Course name is required.'], trim: true },
});

module.exports = mongoose.model('Course', courseSchema);