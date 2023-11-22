import express from 'express'
import { calculateTotal } from '../utils/utils'
import { setPricingRules } from '../data'
const priceRouter = express.Router()

priceRouter.post('/calculateTotal', (req, res) => {
    try {
        const scannedItems: string[] = req.body.scannedItems
        const total = calculateTotal(scannedItems)
        res.json({ total })
    } catch (err: any) {
        console.log(err.message)
        res.status(500).json({
            error: 'Something went wrong on our end. Please try again later.',
        })
    }
})

priceRouter.post('/updatePricingRules', (req, res) => {
    try {
        const updatedRules = req.body.pricingRules
        if (updatedRules) {
            setPricingRules(updatedRules)
            res.json({ success: true })
        } else {
            console.log('Empty payload')
            res.status(400).json({ error: 'Empty payload.' })
        }
    } catch (err: any) {
        console.log(err.message)
        res.status(500).json({
            error: 'Something went wrong on our end. Please try again later.',
        })
    }
})

export default priceRouter
