import styles from "./note.module.css"

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import UpdateIcon from "@mui/icons-material/Update"

const backIcon = "/assets/icons8-back-50.png"
import { getNoteRequest } from "../../api/notes"
import { deleteNoteRequest } from "../../api/notes"

//material-ui
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import Alert from "@mui/material/Alert"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"

const Note = () => {
  const [note, setNote] = useState({})
  const [status, setStatus] = useState(null)
  const [id, setId] = useState(null)
  const [formattedDate, setFormattedDate] = useState("")
  const [hourDate, setHourDate] = useState("")
  const [success, setSuccess] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  //get id from url
  const url = window.location.pathname
  console.log("url:", url)

  //get note  by id
  useEffect(() => {
    const getId = (url) => {
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
      } catch (error) {
        console.log(error)
      }
    }
    getNote()
  }, [id, url])

  //format date
  useEffect(() => {
    if (note.createdAt) {
      setFormattedDate(
        format(new Date(note.createdAt), "EEEE dd 'de' MMM 'de' yyyy")
      )
      setHourDate(format(new Date(note.createdAt), "HH:mm"))
    }
  }, [note.createdAt])

  //open dialog
  const handleConfirmationDelete = () => {
    setOpenDialog(true)
  }

  //close dialog
  const handleClose = () => {
    setOpenDialog(false)
  }

  //handle delete
  const handleDelete = async () => {
    setOpenDialog(false)
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

  return (
    <>
      {success && <Alert severity="success">{statusMessage}</Alert>}

      <div className={styles.status}>
        <Link to="/" className={styles.icon}>
          <img src={backIcon} alt="plus-icon" />
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
          <h3>{note.title}</h3>
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
          // onClick={() => {})}
          // disabled={() => {}
        >
          update
        </Button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
    </>
  )
}
export default Note
