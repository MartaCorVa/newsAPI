

import { MongoClient } from 'mongodb'

const CONNECTION_URL = 'mongodb://localhost:27017'
const DATABASE_NAME = 'newsDB'
let collection = ''
let database = ''

MongoClient.connect( CONNECTION_URL, { useNewUrlParser: true }, ( error, client ) => {
    if( error ) throw error
    
    database = client.db( DATABASE_NAME )
    collection = database.collection( 'news' )

    console.log( `Connected to ${ DATABASE_NAME }.` )
    
})

export {
    collection,
    database
}