// api/create-payment.js
// This is your Vercel Serverless Function that interacts with the Xendit API.
// IMPORTANT: This file must be located directly under an 'api' directory at your project root.

// Ensure you have installed xendit-node: npm install xendit-node
import Xendit from 'xendit-node';

// Initialize Xendit with your secret key from environment variables
// IMPORTANT: Set XENDIT_SECRET_KEY in your Vercel project's Environment Variables
const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

const { Invoice } = xendit;
const invoiceClient = new Invoice({});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    // Ensure 405 response is also JSON
    return res.status(405).json({ message: 'Method Not Allowed', code: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const { customerName, email, amount } = req.body;

    // Basic validation
    if (!customerName || !email || !amount) {
      return res.status(400).json({ message: 'Missing required fields: customerName, email, or amount.', code: 'MISSING_FIELDS' });
    }

    // Generate a unique external ID for the invoice
    // This ID helps you track the invoice on Xendit's dashboard
    const externalId = `invoice-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Define the invoice data for Xendit
    const invoiceData = {
      externalId: externalId,
      amount: amount,
      payerEmail: email,
      description: `Payment for order from ${customerName}`,
      // You can define success/failure redirect URLs specific to your app here
      // For simplicity, we are redirecting to Xendit's hosted page in the frontend
      // successRedirectURL: 'https://your-domain.com/payment-success',
      // failureRedirectURL: 'https://your-domain.com/payment-failure',
      // items: [
      //   {
      //     name: 'Product A',
      //     price: amount,
      //     quantity: 1
      //   }
      // ],
      // fees: [
      //   {
      //     type: 'Service Fee',
      //     value: 1000
      //   }
      // ]
    };

    console.log('Creating Xendit Invoice with data:', invoiceData);

    // Create the invoice using the Xendit SDK
    const createdInvoice = await invoiceClient.createInvoice(invoiceData);

    console.log('Xendit Invoice created:', createdInvoice);

    // Return the payment URL to the frontend
    return res.status(200).json({ paymentUrl: createdInvoice.invoiceUrl });

  } catch (error) {
    console.error('Error creating Xendit payment link:', error);
    // Provide a more generic error message to the client
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.code && error.message) {
      // Xendit API errors often have a code and message
      errorMessage = `Xendit API Error: ${error.message}`;
      errorCode = error.code;
    } else if (error.message) {
      errorMessage = error.message;
    }
    // Ensure 500 response is always JSON
    return res.status(500).json({ message: errorMessage, code: errorCode });
  }
}
