import styles from "./newNote.module.css"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import Alert from "@mui/material/Alert"

const backIcon = "/assets/icons8-back-50.png"

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
        console.log("res:", res)
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
    <>
      {success && <Alert severity="success">{statusMessage}</Alert>}
      <Link to="/" className={styles.icon}>
        <img src={backIcon} alt="plus-icon" />
      </Link>
      <h2>New Note</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "100%" },
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
            rows={3}
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
            Save
          </Button>
        </div>
      </Box>
    </>
  )
}

export default NewNote
