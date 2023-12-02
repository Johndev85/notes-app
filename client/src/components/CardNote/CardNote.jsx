/* eslint-disable react/prop-types */
import styles from "./cardNote.module.css"
import { format } from "date-fns"
import { Link } from "react-router-dom"

const CardNote = ({ note }) => {
  const formattedDate = format(new Date(note.date), "EE d")
  const hourDate = format(new Date(note.date), "HH:mm")

  return (
    <Link to={`/note/${note.id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.title}>
          <div className={styles.date}>
            <span>{formattedDate}</span>
          </div>
          <div className={styles.titleBlock}>
            <h3>{note.title}</h3>
            <span className={styles.hour}>{hourDate}</span>
          </div>
        </div>

        <p>{note.content}</p>
      </div>
    </Link>
  )
}

export default CardNote
