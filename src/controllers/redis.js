const redis = require('../utils/redis-async')

const dataType = 'obj'
const RedisController = {
    post: async (req, res) => {
        const id = req.body.id
        const data = req.body.data
        await redis.hSetAsync(dataType, id, JSON.stringify(data))
        const record = await redis.hGetAsync(dataType, id)
        res.status(200).json({
            success: true,
            data: JSON.parse(record)
        });
    },
    get: async (req, res) => {
        const id = req.query.id
        console.log(`Start get ${id}`)
        const record = await redis.hGetAsync(dataType, id)
        console.log(`End get ${id}`)
        res.status(200).json({
            success: true,
            data: JSON.parse(record)
        });
    },
    delete: async (req, res) => {
        const id = req.query.id
        await redis.hDelAsync(dataType, id)
        res.status(200).json({
            success: true,
            data: `Deleted: ${id}`
        });
    },
}

module.exports = RedisController