const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes - lấy tất cả, mới nhất lên đầu
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/notes - tạo ghi chú mới
router.post('/notes', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      isPinned: req.body.isPinned
    });

    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;