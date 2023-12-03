import express from "express"
import cors from "cors"
import { resolve } from "path"
import morgan from "morgan"

import notesRoutes from "./routes/notes.routes.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(resolve("client/dist")))
app.use(express.json())

app.use("/api", notesRoutes)

export default app
