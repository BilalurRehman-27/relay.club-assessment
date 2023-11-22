// Defining pricing rules and products interface
export interface PricingRule {
    price: number
    deal?: { quantity: number; priceFor: number }
    discount?: { quantity: number; discountedPrice: number }
    freeItem?: string
}
