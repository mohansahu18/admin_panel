import express from "express"
import dotenv from "dotenv"
import DBConnection from "./config/Database.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
dotenv.config()
const app = express()
app.use(cors())
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`server started on port ${PORT} `);
})

DBConnection()