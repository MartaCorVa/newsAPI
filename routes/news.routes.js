

import express from 'express'
import { getAllNews,
         getNumberOfNews,
         getAllArchivedNews,
         getNumberOfArchivedNews,
         archiveNew,
         removeNew } from '../controllers/news.controller.js'

const router = express.Router()

router
    .route( '/' )
    .get( getAllNews )

router
    .route( '/:id' )
    .put( archiveNew )
    .delete( removeNew )

router
    .route( '/number' )
    .get( getNumberOfNews )

router
    .route( '/archived' )
    .get( getAllArchivedNews )

router
    .route( '/archivedNumber' )
    .get( getNumberOfArchivedNews )


export default router