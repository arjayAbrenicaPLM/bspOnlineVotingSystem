import express from 'express'
import pg from 'pg'
import cors from 'cors'
import env from 'dotenv'
import verifyRoutes from './src/routers/regRoutes.js'
import dbRoutes from './src/routers/dbRoutes.js'

const app = express()
const port = 5000

env.config()

app.use(express.json())
app.use(cors())

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  } 
});

// Routes for authentication
app.use('/auth', verifyRoutes)

// Main Route
app.use('/', dbRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

export const query = (text, params) => db.query(text, params)