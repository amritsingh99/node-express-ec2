import express from 'express'
import { convertDateToRawString, convertDateToString } from './lib/date/dateFunctions.js';
import { router as productionRouter } from './production.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(5001, () => {
    console.log('API running on port 5001')
})



app.use('/', productionRouter)