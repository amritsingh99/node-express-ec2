import express from 'express'
import OrderStore from './orders-mongodb.js';
const app = express()

app.listen(5001, () => {
    console.log('API running on port 5001')
})

app.get('/findAll', async (req, res) => {
    try {
        const orders = new OrderStore();
        const data = await orders.readAll();
        res.json(data)
    } catch (err) {
        console.error(err)
    }
})