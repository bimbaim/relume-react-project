// api/create-payment.js
import { Xendit } from 'xendit-node';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const xenditSecretKey = process.env.XENDIT_SECRET_KEY;

    if (!xenditSecretKey) {
      console.error('SERVER CONFIG ERROR: XENDIT_SECRET_KEY is not set!');
      return res.status(500).json({
        message: 'Server configuration error: Xendit API key is missing.',
        code: 'SERVER_CONFIG_ERROR'
      });
    }

    const { customerName, email, amount } = req.body;

    if (!customerName || !email || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }  
    
    // Initialize the Xendit client
    const xenditClient = new Xendit({
      secretKey: xenditSecretKey,
    });

    const externalId = `invoice-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Use the SDK's createInvoice method
    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        externalId: externalId,
        amount: amount,
        payerEmail: email,
        description: `Payment for order from ${customerName}`,
      },
    });

    console.log('SUCCESS: Xendit Invoice created successfully:', invoice.id);
    return res.status(200).json({ paymentUrl: invoice.invoiceUrl });

  } catch (error) {
    console.error('UNEXPECTED SERVER ERROR:', error);
    // The SDK provides structured error objects
    return res.status(error.status || 500).json({
      message: error.message || 'An unexpected error occurred.',
      code: error.code || 'UNKNOWN_ERROR',
    });
  }
}