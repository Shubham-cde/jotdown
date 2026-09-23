const express = require("express");
const {
  getNotes,
  getTrashNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/*
GET /api/notes
POST /api/notes
*/
router
  .route("/")
  .get(protect, getNotes)
  .post(protect, createNote);

router.get("/trash", protect, getTrashNotes);

router
  .route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
