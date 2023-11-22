import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import priceRouter from './routers/price.router'

const app = express()
const port = 3001
app.use(cors()) // Enable CORS for all routes
app.use(bodyParser.json())

app.use('/api/price', priceRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
