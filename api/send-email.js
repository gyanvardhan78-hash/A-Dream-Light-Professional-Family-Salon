import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers allow karne ke liye
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, phone, service, date, time, advance, balance, paymentId } = req.body;

      // Gmail SMTP Configuration
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `🎉 New Booking: ${service} by ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px;">
            <h2 style="color: #D4AF37; text-align: center;">A Dream Light Salon</h2>
            <h3 style="text-align: center; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;">New Booking Confirmed! ✅</h3>
            
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>WhatsApp Number:</strong> ${phone}</p>
            <p><strong>Service Selected:</strong> ${service}</p>
            <p><strong>Date & Time:</strong> ${date} at ${time}</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 5px 0;"><strong>Advance Paid (Razorpay):</strong> <span style="color: green;">₹${advance}</span></p>
              <p style="margin: 5px 0;"><strong>Balance to collect at Salon:</strong> <span style="color: #D4AF37; font-size: 18px; font-weight: bold;">₹${balance}</span></p>
              <p style="margin: 5px 0; font-size: 12px; color: #666;">Payment ID: ${paymentId}</p>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">This is an automated notification from your booking system.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error("Detailed Server Email Error:", error);
      // Client ko crash hone se bachane ke liye graceful response
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}