import {default as express} from 'express'
import OrderStore from './orders-mongodb.js';

export const router = express.Router()

router.get('/findAll/:limitNum', async (req, res) => {
    try {
        const orders = new OrderStore();
        // console.log('Getting all orders');
        const data = await orders.readAll(undefined, req.params.limitNum);
        // console.log('Amrit', data);
        res.json(data)
    } catch (err) {
        console.error(err)
    }
})

router.get('/byDate/:date', async (req, res) => {
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

router.get('/client/:clientName', async (req, res) => {
    try {
        const orders = new OrderStore()
        const client = req.params.clientName
        const data = await orders.read(client)
        console.log(data);
        res.json(data)
    } catch (err) {
        console.log(err)
    }
})

router.get('/clients', async (req, res) => {
    try {
        const orders = new OrderStore()
        const clientList = await orders.getClients()
        console.log(clientList);
        res.json(clientList)
    } catch (error) {
        console.log(error);
    }
})