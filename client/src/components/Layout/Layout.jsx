/* eslint-disable react/prop-types */
import styles from "./layout.module.css"

const Layout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <h1>Notes App</h1>
      <section className={styles.container}>{children}</section>
    </main>
  )
}

export default Layout
