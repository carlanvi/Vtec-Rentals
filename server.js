const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your Stripe Secret Key

const app = express();
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Rental Service',  // Name of the service
                        },
                        unit_amount: 5000, // 50.00 USD in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`, // Replace with your success URL
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,   // Replace with your cancel URL
        });

        res.json({ sessionId: session.id }); // Send session ID to frontend
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Error creating checkout session');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
