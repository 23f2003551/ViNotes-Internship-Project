const express=require("express")
const router = express.Router();
const Note = require("../models/Note");

router.post("/save", async (req, res) => {
  const { username,content } = req.body;
  const updatedNote = await Note.findOneAndUpdate(
      { username },
      { content },
      {
        new: true,
        upsert: true
      }
    );

    console.log(updatedNote);

  res.status(200).json({
    message: "Save route working"
  });
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const existingNote = await Note.findOne({ username });

    if (!existingNote) {
      return res.status(404).json({
        message: "No note found"
      });
    }

    res.status(200).json({
      content: existingNote.content
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;