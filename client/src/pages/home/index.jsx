import styles from "./home.module.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import CardNote from "../../components/CardNote/CardNote"
const plusIcon = "/assets/icons8-plus.svg"

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

  console.log("notes:", notes)

  return (
    <>
      <Link to="/add-note" className={styles.icon}>
        <img src={plusIcon} alt="plus-icon" />
      </Link>

      {notes !== undefined ? (
        notes.map((note) => <CardNote key={note.id} note={note} />)
      ) : (
        <div>Add your first note</div>
      )}
    </>
  )
}

export default Home
