import express from "express"
import morgan from "morgan"

import notesRoutes from "./routes/notes.routes.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api", notesRoutes)

export default app
