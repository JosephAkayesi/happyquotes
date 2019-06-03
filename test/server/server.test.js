const request = require('supertest')
const app = require('../../server/server')

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 5000)); // avoid jest open handle error
})

describe('Server should', () => {
    it('send a status 404', async (done) => {
        const res = await request(app).get('/')
        expect(res.status).toBe(404)
        done()
    })

    it('send a statusType of 4', async (done) => {
        const res = await request(app).get('/')
        expect(res.statusType).toBe(4)
        done()
    })
})