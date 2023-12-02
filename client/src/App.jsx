import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout/Layout.jsx"
import Home from "./pages/home/index.jsx"
import Note from "./pages/note/index.jsx"
import NewNote from "./pages/new-note/index.jsx"

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<NewNote />} />
          <Route path="/note/:id" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
