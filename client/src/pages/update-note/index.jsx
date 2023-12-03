import styles from "./updateNote.module.css"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import { Fab } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import UpdateIcon from "@mui/icons-material/Update"
import Alert from "@mui/material/Alert"

import Loader from "../../components/Loader/Loader"

import { updateNoteRequest } from "../../api/notes"

const UpdateNote = () => {
  const location = useLocation()

  //preview data
  const previewData = location.state.note

  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(previewData.title)
  const [description, setDescription] = useState(previewData.content)
  const [status, setStatus] = useState(previewData.status)
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

  //handle select
  const handleChangeSelect = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmit = async () => {
    if (formValid) {
      const data = {
        id: previewData.id,
        title: title,
        content: description,
        status: status,
      }
      setIsLoading(true)
      try {
        const res = await updateNoteRequest(data)
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
    <div className={styles.updateContainer}>
      {success && (
        <div className={styles.alert}>
          <Alert severity="success">{statusMessage}</Alert>{" "}
        </div>
      )}
      <div className={styles.top}>
        <Link to={`/note/${previewData.id}`} className={styles.icon}>
          <Fab color="primary" aria-label="add">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </div>
      <h2>Update Note</h2>
      {isLoading ? (
        <Loader />
      ) : (
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
              rows={6}
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => handleBlur("description")}
              error={descriptionError}
              helperText={descriptionError && "Description is required"}
            />
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              autoWidth
              onChange={handleChangeSelect}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </div>

          <div className={styles.buttonsForm}>
            <Button
              variant="contained"
              endIcon={<UpdateIcon />}
              onClick={handleSubmit}
              disabled={!formValid}
            >
              Update note
            </Button>
          </div>
        </Box>
      )}
    </div>
  )
}

export default UpdateNote
