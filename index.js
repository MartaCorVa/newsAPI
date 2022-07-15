

import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5000

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )


app.listen( PORT, () => console.log( `Server running on port: http://localhost:${PORT}` ) )

/* Error handler middleware */
app.use( ( err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    console.error( err.message, err.stack );
    res.status( statusCode ).json( { message: err.message } );
    return;
} )

app.use( ( req, res, next ) => {
    res.header( 'Access-Control-Allow-Origin', '*' )
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' )
    next()
} )

import newsRouter from './routes/news.routes.js'
app.use( '/news', newsRouter )