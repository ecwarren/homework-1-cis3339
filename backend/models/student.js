const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:      { type: String, required: [true, 'Name is required.'], trim: true },
  studentId: { type: String, required: [true, 'Student ID is required.'], trim: true, unique: true },
  phone:     { type: String, required: [true, 'Phone is required.'], trim: true },
  zip:       { type: String, required: [true, 'ZIP code is required.'], trim: true },
});

module.exports = mongoose.model('Student', studentSchema);
