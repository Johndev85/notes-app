import styles from "./home.module.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

//components
import CardNote from "../../components/CardNote/CardNote"
import Loader from "../../components/Loader/Loader"

//material-ui
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

//api
import { getNotesRequest } from "../../api/notes"

const Home = () => {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //get all notes
  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true)
      try {
        const res = await getNotesRequest()
        if (res === undefined) {
          throw new Error("Response is undefined")
        }

        setNotes(res.data.notes)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getNotes()
  }, [])

  return (
    <div className={styles.homeContainer}>
      <Link to="/new-note" className={styles.icon}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>

      {isLoading ? (
        <Loader />
      ) : notes !== undefined ? (
        notes.map((note) => <CardNote key={note.id} note={note} />)
      ) : (
        <div className={styles.emptyContainer}>
          <span>Add your first note</span>
        </div>
      )}
    </div>
  )
}

export default Home
