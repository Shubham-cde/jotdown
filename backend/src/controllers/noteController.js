const Note = require("../models/Note");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({
  user: req.user.id,
  isDeleted: false,
}).sort({
  isPinned: -1,
  createdAt: -1,
});
    res.json(notes);
  } catch (error) {
    next(error);
  }
};
const getTrashNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
      isDeleted: true,
    }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      tags: tags || [],
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    note.isPinned = req.body.isPinned ?? note.isPinned;
    note.isFavorite = req.body.isFavorite ?? note.isFavorite;
    note.tags = req.body.tags ?? note.tags;
    note.isDeleted = req.body.isDeleted ?? note.isDeleted;

    const updated = await note.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = true;

await note.save();

res.json({
  success: true,
  note,
});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getNotes,
  getTrashNotes,
  createNote,
  updateNote,
  deleteNote,
};