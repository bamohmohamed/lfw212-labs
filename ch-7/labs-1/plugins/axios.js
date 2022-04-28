'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-axios'), {
        errorHandler: false,
        responseType: 'json',
        timeout: 1250,
    })
})
