'use strict'

const {promisify} = require('util')
const {boat} = require('../../model')
const uid = boat.uid
const read = promisify(boat.read)
const create = promisify(boat.create)
const del = promisify(boat.del)

module.exports = async function (fastify, opts) {
    fastify.get('/:id', async function (request, reply) {
        const {id} = request.params
        try {
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
        console.log(id)
        await create(id, data)
        reply.code(201)
        return {id}
    })

    fastify.delete('/:id', async function (request, reply) {
        const {id} = request.params
        try {
            await del(id)
            reply.code(204)
            return {}
        } catch (err) {
            if (err.code === 'E_NOT_FOUND') {
                throw fastify.httpErrors.notFound()
                return
            }
            throw err
        }
    })
}