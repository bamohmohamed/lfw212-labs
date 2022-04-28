'use strict'


module.exports = async function (fastify, opts) {
    const {
        BOAT_SERVICE_PORT = 50462,
        BRAND_SERVICE_PORT = 50463
    } = process.env

    const boatsvc = `http://localhost:${BOAT_SERVICE_PORT}`
    const brandsvc = `http://localhost:${BRAND_SERVICE_PORT}`

    fastify.get('/:id', async function (request, reply) {
        try {
            const {id} = request.params
            const {data: boat} = await fastify.axios.get(`${boatsvc}/${id}`, {timeout: 1250})
            const {data: brand} = await fastify.axios.get(`${brandsvc}/${boat.brand}`, {timeout: 1250})
            return {
                id: boat.id,
                color: boat.color,
                brand: brand.name
            }
        } catch (err) {
            if (!err.response || !err.response.status) throw err
            if (err.response.status === 404) throw fastify.httpErrors.notFound()
            if (err.response.status === 400) throw fastify.httpErrors.badRequest()
            throw err
        }

    })
}
