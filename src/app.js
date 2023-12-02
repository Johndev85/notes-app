import express from "express"
import cors from "cors"
import morgan from "morgan"

import notesRoutes from "./routes/notes.routes.js"
import { FRONTEND_URL } from "./config.js"

const app = express()

app.use(
  cors({
    origin: FRONTEND_URL,
  })
)

app.use(morgan("dev"))
app.use(express.json())

app.use("/api", notesRoutes)

export default app
