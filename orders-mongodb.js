import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
import DBG from 'debug';
import { default as dotenv } from 'dotenv'
dotenv.config()
const debug = DBG('orders:orders-mongodb')
const error = DBG('orders:error-mongodb')

// Custom Libraries
import { processData, mapDocs, transformData } from './lib/data/dataTransform.js';

let client;

const connectDB = async() => {
    const uri = process.env.MONGO_URL
    if (!client) client = await MongoClient.connect(uri);
    // console.log(uri);
    // console.log(client);
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
        // console.log(collection);
        return collection;
    }

    async close() {
        if (client) client.close()
        client = undefined
    }

    // async read(key) {
    //     await connectDB()
    //     const collection = await this.#returnCollection();
    //     const doc = await collection.find().limit(1).toArray()
    //     return doc
    // }

    async readAll(date, limitNum) {
        await connectDB()
        const collection = await this.#returnCollection();
        const headers = ['Fname', 'Pick', 'Repeat', 'Client']
        if (date == undefined) {
            const data = await processData(collection, headers, limitNum);
            return data
        }
        
        const pipeline = [
            {
                $match : {Job_Date : date}
            }
        ]

        const data = await collection.aggregate(pipeline).toArray()

        const transformedDocs = transformData(data)

        const docs = mapDocs(transformedDocs, headers)        

        return docs;
        
        
        // const docs = await collection.find().toArray()
        // console.log(docs);
        // console.log(data)

        // const projection = {_id : 0 };
        // const sort = {SNo: 1}
        // const pipeline = [
        //     {
        //         $addFields : {
        //             columnNumber : { $toInt : "$SNo"}
        //         }
        //     },
        //     {
        //         $sort : {columnNumber : 1}
        //     }
        // ]

        // const doc = await collection.aggregate(pipeline).project(projection).toArray()
        // console.log(data);
    }


    async read(client) {
        client = client.toLowerCase()
        await connectDB()
        const collection = await this.#returnCollection()
        const data = await collection.aggregate([
            {
                $match : { "Client" :  "RC Labels"}
            }
        ]).toArray()
        const transformedDocs = transformData(data)
        const headers = ['Fname', 'Pick', 'Repeat', 'Client']
        const docs = mapDocs(transformedDocs, headers)          
        return docs
    }

    async getClients() {
        await connectDB()
        const collection = await this.#returnCollection()        
        const data = await collection.distinct("Client")
        // console.log(data);
        return data
    }

}