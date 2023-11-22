import express from 'express'
import { calculateTotal } from '../utils/utils'
import { pricingRules, setPricingRules } from '../data'
const priceRouter = express.Router()

priceRouter.post('/calculateTotal', (req, res) => {
    const scannedItems: string[] = req.body.scannedItems
    try {
        const total = calculateTotal(scannedItems)
        res.json({ total })
    } catch (err: any) {
        console.log(err.message)
        res.status(500).json({
            error: 'Something went wrong on our end. Please try again later',
        })
    }
})

priceRouter.post('/updatePricingRules', (req, res) => {
    const updatedRules = req.body.pricingRules
    if (updatedRules) {
        setPricingRules(updatedRules)
        res.json({ success: true })
    } else {
        res.status(400).json({ error: 'Invalid request' })
    }
})

export default priceRouter
