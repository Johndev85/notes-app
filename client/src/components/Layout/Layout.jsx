/* eslint-disable react/prop-types */
import styles from "./layout.module.css"

import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const Layout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <Header />
      <section className={styles.container}>{children}</section>
      <Footer />
    </main>
  )
}

export default Layout
