import { pricingRules } from '../data'

export const calculateTotal = (scannedItems: string[]): number => {
    const itemCounts: { [key: string]: number } = {}
    let total = 0

    // Count the occurrences of each item
    scannedItems.forEach((item) => {
        itemCounts[item] = (itemCounts[item] || 0) + 1
    })

    // Calculate total based on generic pricing rules
    Object.keys(itemCounts).forEach((item) => {
        const { price, deal, discount, freeItem } = pricingRules[item]
        const count = itemCounts[item]

        if (deal && count >= deal.quantity) {
            // Apply deal
            total +=
                (Math.floor(count / deal.quantity) * deal.priceFor +
                    (count % deal.quantity)) *
                price
        } else if (discount && count >= discount.quantity) {
            // Apply discount
            total += discount.discountedPrice * count
        } else {
            // Regular price for other items
            total += price * count
        }

        if (freeItem && itemCounts[freeItem]) {
            // Apply free item
            const freeItemCount = Math.min(count, itemCounts[freeItem])
            total -= freeItemCount * pricingRules[freeItem].price
        }
    })

    return total
}
