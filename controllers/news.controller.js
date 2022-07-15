

import { collection } from '../services/db.js'

/**
 * Get all not archived news, ordered by date
 * @param {request} req 
 * @param {response} res 
 */
const getAllNews = async ( req, res ) => {
    try {
        collection
            .find( { archiveDate: '' } )
            .sort( { date: 1 } )
            .toArray( ( error, result ) => {
                if( error ) throw error
                res.status( 200 ).send( result )
        } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

/**
 * Get all archived news, ordered by archive date
 * @param {request} req 
 * @param {response} res 
 */
const getAllArchivedNews = async ( req, res ) => {
    try {
        collection
            .find( { archiveDate: {  $ne: '' } } )
            .sort( { archiveDate: 1 } )
            .toArray( ( error, result ) => {
                if( error ) throw error
                res.status( 200 ).send( result )
        } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

/**
 * Count not archived news
 * @param {request} req 
 * @param {response} res 
 */
const getNumberOfNews = async ( req, res ) => {
    try {
        collection
            .count( {  archiveDate: '' } , ( error, result ) => {
                if( error ) throw error
                res.status( 200 ).json( result )
            } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

/**
 * Count archived news
 * @param {request} req 
 * @param {response} res 
 */
const getNumberOfArchivedNews = async ( req, res ) => {
    try {
        collection
            .count( { archiveDate: {  $ne: '' } } , ( error, result ) => {
                if( error ) throw error
                res.status( 200 ).json( result )
            } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

/**
 * Archive a new using the param id
 * @param {request} req 
 * @param {response} res 
 */
const archiveNew = async ( req, res ) => {
    try {
        collection
            .updateOne( { _id: parseInt( req.params.id, 10 ) }, 
                        { 
                            $set: {
                                archiveDate: new Date()
                            } 
                        }
                    )
        res.status( 200 ).send( { message: 'The new has been archived.' } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

/**
 * Remove a new using the param id
 * @param {request} req 
 * @param {response} res 
 */
const removeNew = async ( req, res ) => {
    try {
        collection.deleteOne( { _id: parseInt( req.params.id, 10 ) } )
        res.status( 200 ).send( { message: 'The new has been removed.' } )
    } catch ( err ) {
        res.status( 500 ).send( err.message )
    }
}

export {
    getAllNews,
    getNumberOfNews,
    getAllArchivedNews,
    getNumberOfArchivedNews,
    archiveNew,
    removeNew
}

