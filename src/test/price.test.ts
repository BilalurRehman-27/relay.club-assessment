import request from 'supertest'
import express from 'express'
import priceRouter from '../routers/price.router' // Adjust the path accordingly

const app = express()
app.use(express.json())
app.use('/', priceRouter)

describe('POST /calculateTotal', () => {
    test('calculates total correctly', async () => {
        const response = await request(app)
            .post('/calculateTotal')
            .send({ scannedItems: ['atv', 'atv', 'atv', 'vga'] })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('total')
        expect(typeof response.body.total).toBe('number')
    })

    test('handles invalid input gracefully', async () => {
        const response = await request(app)
            .post('/calculateTotal')
            .send({ scannedItems: null })

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error')
        expect(typeof response.body.error).toBe('string')
    })
})
