# relay.club-assessment

Software Engineer Coding Test

The purpose of this assessment is to create a software that can be used as a Checkout feature for retailer store.
Project structure contains backend code on the root and UI code in the `ui` folder.
Since, to the best of my knowledge, this assessment was created to access my React/Node.js skills I did not used any database for this assessment. And I kept the data in the server's request lifecycle. If needed, I can create
database structure.

For frontend, see the ReadMe.md file in the `ui` folder.
For backend simply follow the instructions given below to start the server.

## Installation

```bash
$ npm install
```

## Running the app

Before running the npm commands, please make sure you have the Node and npm versions described in package.json

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

### Note

There is a hidden endpoint that I created for the changing the pricing and deals/discount parameters.
Since, mostly that feature is used by an admin so I did not build a UI for this. But you can see this
documentation to see how it works.

`Price update`
To update price parameters, user needs to hit the endpoint `http://localhost:3001/api/price/updatePricingRules` which is `post` api call, with this payload.

```
    {
        "pricingRules": {
            "atv": {
                "price": 120.00,
                "deal": {
                    "quantity": 2,
                    "priceFor": 1
                }
            },
            "ipd": {
                "price": 599.99,
                "discount": {
                    "quantity": 3,
                    "discountedPrice": 549.99
                }
            },
            "mbp": {
                "price": 1599.99,
                "freeItem": "vga"
            },
            "vga": {
                "price": 25.00
            }
        }
    }
```
