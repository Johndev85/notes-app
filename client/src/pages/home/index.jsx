import styles from "./home.module.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import CardNote from "../../components/CardNote/CardNote"
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import { getNotesRequest } from "../../api/notes"

const Home = () => {
  const [notes, setNotes] = useState([])

  //get all notes
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await getNotesRequest()
        if (res === undefined) {
          throw new Error("Response is undefined")
        }

        setNotes(res.data.notes)
      } catch (error) {
        console.log(error)
      }
    }
    getNotes()
  }, [])

  return (
    <>
      <Link to="/add-note" className={styles.icon}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>

      {notes !== undefined ? (
        notes.map((note) => <CardNote key={note.id} note={note} />)
      ) : (
        <div className={styles.emptyContainer}>
          <span>Add your first note</span>
        </div>
      )}
    </>
  )
}

export default Home
