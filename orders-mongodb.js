import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
import DBG from 'debug';
import { default as dotenv } from 'dotenv'
dotenv.config()
const debug = DBG('orders:orders-mongodb')
const error = DBG('orders:error-mongodb')

let client;

const connectDB = async() => {
    const uri = process.env.MONGO_URL
    if (!client) client = await MongoClient.connect(uri);
    // console.log(process.env.MONGO_DBNAME);
    // console.log(process.env.MONGO_URL);
}

const db = () => {
    return client.db(process.env.MONGO_DBNAME);
}

export default class MongoDBOrdersStore {
    async updateDates() {
        await connectDB();
        const collection = await this.#returnCollection();
        
    }

    async #returnCollection() {
        await connectDB()
        const database = db()
        const collection = await database.collection('P_IDENTIFICATION')
        return collection;
    }

    async close() {
        if (client) client.close()
        client = undefined
    }

    async read(key) {
        await connectDB()
        const collection = await this.#returnCollection();
        const doc = await collection.find().limit(1).toArray()
        return doc
    }

    async readAll() {
        await connectDB()
        const collection = await this.#returnCollection();
        const projection = {_id : 0 };
        const doc = await collection.find().limit(10).project(projection).toArray()
        return doc        
    }
}

// const orders = new MongoDBOrdersStore();
// const data = await orders.read(1);
// console.log(data);