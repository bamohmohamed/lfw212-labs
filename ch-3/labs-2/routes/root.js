'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        reply.code(200)
        return {}
    })
    fastify.post('/', async function (request, reply) {
        reply.code(405)
        return {}
    })
}
