'use strict'
const {promisify} = require('util')
const {boat} = require('../../model')
const read = promisify(boat.read)

module.exports = async function (fastify, opts) {
    fastify.get('/:id', async function (request, reply) {
        try {
            return await read(request.params.id)
        } catch (err) {
            if (err.code === 'E_NOT_FOUND') {
                throw fastify.httpErrors.notFound()
                return
            }
            throw err
        }

    })
}