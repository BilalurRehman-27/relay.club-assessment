import { PricingRule } from '../types'

// Sample data
export let pricingRules: { [key: string]: PricingRule } = {
    atv: { price: 109.5, deal: { quantity: 3, priceFor: 2 } },
    ipd: { price: 549.99, discount: { quantity: 5, discountedPrice: 499.99 } },
    mbp: { price: 1399.99, freeItem: 'vga' },
    vga: { price: 30.0 },
}

export function setPricingRules(newRules: Record<string, any>) {
    pricingRules = newRules
}
