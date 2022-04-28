'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const {PORT = 3000} = process.env

router.use((req, res, next) => {
    if(req.query.un && Array.isArray(req.query.un )){
        req.query.un = req.query.un[0]
    }
    next()
})

router.get('/', (req, res) => {
    setTimeout(() => {
        res.send((req.query.un || '').toUpperCase())
    }, 1000)
})

app.use(router)

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`)
})