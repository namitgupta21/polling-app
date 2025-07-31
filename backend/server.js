import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import pollRoutes from './routes/poll-routes.js'
import userRoutes from './routes/user-routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/userroutes', userRoutes)
app.use('/pollroutes', pollRoutes)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(7778, () =>
      console.log(`Server running `)
    )
  })
  .catch((err) => console.error('MongoDB connection error:', err))
