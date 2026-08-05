import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, 
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount, 
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}