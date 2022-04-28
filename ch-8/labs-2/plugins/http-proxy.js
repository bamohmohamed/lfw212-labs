'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-http-proxy'), {
        errorHandler: false,
        upstream: 'https://jsonplaceholder.typicode.com'
    })
})
