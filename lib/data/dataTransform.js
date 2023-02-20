import { convertDateToString } from '../date/dateFunctions.js';

const sortByDate = (docs) => {
    docs = docsDateToString(docs)
    docs.sort((docOne, docTwo) => {
        return docOne['Job_Date'] - docTwo['Job_Date'];
    })
    return docs
}

const docsDateToString = (docs) => {
    docs.forEach((document) => {
        document['Job_Date'] = new Date(document['Job_Date'].slice(4, 8), document['Job_Date'].slice(2, 4), document['Job_Date'].slice(0, 2));
    })
    return docs;
}

export const mapDocs = (docs, headers) => {
    const data = docs.map((element, idx) => {
        let values = headers.map((header) => element[header])
        const stringDate = convertDateToString(element['Job_Date'])
        values.unshift(stringDate)
        return values
    })
    
    // console.log(data);
    return data
}

export const transformData = (docs) => {
    docs = sortByDate(docs)
    return docs
}

export const processData = async (collection, headers, limitNum) => {
    const docs = await collection.find().toArray()
    // console.log(docs);
    const transformedDocs = transformData(docs)
    const data = mapDocs(transformedDocs, headers)
    if (data.length <= limitNum) {
        return data
    } 
    return data.slice(-parseInt(limitNum), data.length)
    // return data
};