'use strict'

const {promisify} = require('util')
const {boat} = require('../../model')
const uid = boat.uid
const read = promisify(boat.read)
const create = promisify(boat.create)


module.exports = async function (fastify, opts) {
    fastify.get('/:id', async function (request, reply) {
        try {
            const {id} = request.params
            return await read(id)
        } catch (err) {
            if (err.code === 'E_NOT_FOUND') {
                throw fastify.httpErrors.notFound()
                return
            }
            throw err
        }
    })

    fastify.post('/', async function (request, reply) {
        const {data} = request.body
        const id = uid()
        await create(id, data)
        reply.code(201)
        return {id}
    })
}
