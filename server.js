import express from 'express'
import OrderStore from './orders-mongodb.js';
import { convertDateToRawString, convertDateToString } from './lib/date/dateFunctions.js';

const app = express()

app.listen(5001, () => {
    console.log('API running on port 5001')
})

app.get('/findAll', async (req, res) => {
    try {
        const orders = new OrderStore();
        // console.log('Getting all orders');
        const data = await orders.readAll(undefined);
        // console.log('Amrit', data);
        res.json(data)
    } catch (err) {
        console.error(err)
    }
})

app.get('/byDate/:date', async (req, res) => {
    // console.log(req.params.date);
    try {
        const orders = new OrderStore()
        const date = new Date(req.params.date)
        console.log(convertDateToRawString(date));
        const data = await orders.readAll(convertDateToRawString(date))
        res.json(data)
    } catch (error) {
        
    }
})