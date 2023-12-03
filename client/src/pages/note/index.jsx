import styles from "./note.module.css"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import UpdateIcon from "@mui/icons-material/Update"
import { Fab } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { getNoteRequest } from "../../api/notes"
import { deleteNoteRequest } from "../../api/notes"

import Loader from "../../components/Loader/Loader"

//material-ui
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import Alert from "@mui/material/Alert"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"

const Note = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [note, setNote] = useState({})
  const [status, setStatus] = useState(null)
  const [id, setId] = useState(null)
  const [formattedDate, setFormattedDate] = useState("")
  const [hourDate, setHourDate] = useState("")
  const [formattedDateUpdate, setFormattedDateUpdate] = useState("")
  const [hourDateUpdate, setHourDateUpdate] = useState("")
  const [success, setSuccess] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  //get  pathname from url
  const url = location.pathname

  //get note  by id
  useEffect(() => {
    const getId = (url) => {
      setIsLoading(true)
      setId(url.substring(url.lastIndexOf("/") + 1))
    }
    getId(url)
    const getNote = async () => {
      if (!id) {
        return
      }
      try {
        const res = await getNoteRequest(id)
        if (res === undefined) {
          throw new Error("Response is undefined")
        }

        setNote(res.data.singleNote)
        setStatus(res.data.singleNote.status)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getNote()
  }, [id, url])

  //format date
  useEffect(() => {
    if (note.createdAt) {
      setFormattedDate(format(new Date(note.createdAt), "EEEE dd MMM yyyy"))
      setHourDate(format(new Date(note.createdAt), "HH:mm"))
    }

    if (note.updatedAt) {
      setFormattedDateUpdate(format(new Date(note.updatedAt), "yyyy-MM-dd"))
      setHourDateUpdate(format(new Date(note.updatedAt), "HH:mm"))
    }
  }, [note.createdAt, note.updatedAt])

  //open dialog
  const handleConfirmationDelete = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  //handle delete
  const handleDelete = async () => {
    setOpenDialog(false)
    setIsLoading(true)
    if (!id || id === undefined) {
      return
    }
    try {
      const res = await deleteNoteRequest(id)
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

  //handle update
  const handleUpdate = () => {
    navigate(`/update-note`, {
      state: {
        note: note,
      },
    })
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.noteContainer}>
      {success && (
        <div className={styles.alert}>
          <Alert severity="success">{statusMessage}</Alert>{" "}
        </div>
      )}

      <div className={styles.status}>
        <Link to={"/"} className={styles.icon}>
          <Fab color="primary" aria-label="add">
            <ArrowBackIcon />
          </Fab>
        </Link>
        <span
          className={`${
            status === "completed" ? styles.btnCompleted : styles.btnPending
          }`}
        >
          {note.status}
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.date}>
          <span>{formattedDate}</span>
          <span className={styles.hour}>{hourDate}</span>
        </div>
        <div className={styles.title}>
          <h2>{note.title}</h2>
        </div>
        <div className={styles.content}>
          <p>{note.content}</p>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleConfirmationDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          endIcon={<UpdateIcon />}
          onClick={handleUpdate}
        >
          update
        </Button>
      </div>
      {note.updatedAt > note.createdAt && (
        <div className={styles.lastUpdate}>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>Last update: </span>
            <span>{formattedDateUpdate}</span>
            <span className={styles.hour}>{hourDateUpdate}</span>
          </div>
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.modal}
      >
        <DialogTitle id="alert-dialog-title">
          {"Can you confirm the deletion?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Note
