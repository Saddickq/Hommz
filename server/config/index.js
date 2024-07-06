import dotenv from "dotenv"

dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const SECRET = process.env.SECRET

const NODE_ENV = process.env.NODE_ENV
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export { DB_URL, PORT, SECRET, NODE_ENV, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }