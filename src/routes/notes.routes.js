import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Error handling middleware
function handleError(err, req, res, next) {
  console.error(err)
  res.status(500).json({ message: "An error occurred", error: err.message })
}

//get all notes
router.get("/notes", async (req, res, next) => {
  try {
    const notes = await prisma.notes.findMany()
    if (!notes) {
      return res.status(404).json({ message: `No notes found.` })
    }
    if (notes.length === 0) {
      return res.status(200).json({ message: `No notes found.` })
    }
    res.json({
      message: "All notes",
      notes,
    })
  } catch (err) {
    next(err)
  }
})

//create a new note
router.post("/notes", async (req, res, next) => {
  try {
    const { title, content } = req.body
    const newNote = await prisma.notes.create({
      data: {
        title,
        content,
        status: "pending",
      },
    })

    res.json({
      message: "Note created successfully.",
      newNote,
    })
  } catch (err) {
    next(err)
  }
})

//get a note by id
router.get("/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const singleNote = await prisma.notes.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!singleNote) {
      return res.status(404).json({ message: `Note not found.` })
    }
    res.json({
      message: `Note found with ID: ${id}`,
      singleNote,
    })
  } catch (err) {
    next(err)
  }
})

//delete a note by id
router.delete("/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const noteDeleted = await prisma.notes.delete({
      where: {
        id: parseInt(id),
      },
    })
    if (!noteDeleted) {
      return res.status(404).json({ message: `Note not found.` })
    }

    res.json({
      message: `Note deleted successfully.`,
      noteDeleted,
    })
  } catch (err) {
    next(err)
  }
})

//update a note by id
router.put("/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, content, status } = req.body
    const updatedNote = await prisma.notes.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        status,
      },
    })

    if (!updatedNote) {
      return res.status(404).json({ message: `Note not found.` })
    }

    res.json({
      message: `Note updated with ID: ${id}`,
      updatedNote,
    })
  } catch (err) {
    next(err)
  }
})

//update status of a note by id
router.put("/notes/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const updatedNote = await prisma.notes.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    })

    if (!updatedNote) {
      return res.status(404).json({ message: `Note not found.` })
    }

    res.json({
      message: `Note status updated with ID: ${id}`,
      updatedNote,
    })
  } catch (err) {
    next(err)
  }
})

// Use the error handling middleware
router.use(handleError)

export default router
