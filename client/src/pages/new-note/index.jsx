import styles from "./newNote.module.css"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import Alert from "@mui/material/Alert"
import { Fab } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { createNoteRequest } from "../../api/notes"

const NewNote = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (title && description) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [title, description])

  const handleBlur = (field) => {
    if (field === "title") {
      setTitleError(!title)
    } else {
      setDescriptionError(!description)
    }
  }

  const handleSubmit = async () => {
    if (formValid) {
      const data = {
        title: title,
        content: description,
      }

      try {
        const res = await createNoteRequest(data)
        if (res === undefined) {
          throw new Error("Response is undefined")
        }
        if (res.status === 200) {
          setSuccess(true)
          setStatusMessage(res.data.message)
          setTimeout(() => {
            navigate("/")
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={styles.newNoteContainer}>
      {success && (
        <div className={styles.alert}>
          <Alert severity="success">{statusMessage}</Alert>{" "}
        </div>
      )}
      <div className={styles.top}>
        <Link to="/" className={styles.icon}>
          <Fab color="primary" aria-label="add">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </div>
      <h2>New Note</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="Title"
            multiline
            maxRows={4}
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
            error={titleError}
            helperText={titleError && "Title is required"}
          />

          <TextField
            id="standard-multiline-static"
            label="Starting writing"
            multiline
            rows={6}
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => handleBlur("description")}
            error={descriptionError}
            helperText={descriptionError && "Description is required"}
          />
        </div>

        <div className={styles.buttonsForm}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Create note
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default NewNote
