// api/create-payment.js
// This is your Vercel Serverless Function that interacts with the Xendit API.
// IMPORTANT: This file must be located directly under an 'api' directory at your project root.

// Ensure you have installed xendit-node: npm install xendit-node
import Xendit from 'xendit-node';

let xenditInstance; // Declare outside to potentially reuse or for error handling

try {
  // Initialize Xendit with your secret key from environment variables
  // IMPORTANT: Set XENDIT_SECRET_KEY in your Vercel project's Environment Variables
  if (!process.env.XENDIT_SECRET_KEY) {
    console.error('ERROR: XENDIT_SECRET_KEY is not set in environment variables!');
    // Throw an error early if the key is missing to prevent undefined behavior
    throw new Error('XENDIT_SECRET_KEY is not configured.');
  }
  xenditInstance = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY,
  });
  console.log('Xendit instance initialized successfully.');
} catch (initError) {
  console.error('Failed to initialize Xendit instance:', initError);
  // Re-throw to ensure the handler catches this initialization failure
  throw initError;
}


const { Invoice } = xenditInstance; // Use the initialized instance
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
      console.warn('Validation failed: Missing required fields.', { customerName, email, amount });
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

    console.log('Attempting to create Xendit Invoice with data:', invoiceData);

    // Create the invoice using the Xendit SDK
    const createdInvoice = await invoiceClient.createInvoice(invoiceData);

    console.log('Xendit Invoice created successfully:', createdInvoice.id); // Log the invoice ID for tracking

    // Return the payment URL to the frontend
    return res.status(200).json({ paymentUrl: createdInvoice.invoiceUrl });

  } catch (error) {
    console.error('Catch block entered: Error during invoice creation or Xendit API call:', error);
    // Provide a more generic error message to the client
    let errorMessage = 'An unexpected error occurred on the server. Please try again later.';
    let errorCode = 'UNKNOWN_SERVER_ERROR';

    if (error instanceof Error) { // Check if it's a standard Error object
      errorMessage = error.message;
      if (error.code) { // Xendit SDK errors often have a 'code' property
        errorCode = error.code;
        errorMessage = `Xendit API Error [${error.code}]: ${error.message}`;
      } else {
        errorCode = 'XENDIT_SDK_ERROR'; // General SDK error
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
      errorCode = 'STRING_ERROR';
    }

    // Ensure 500 response is always JSON
    return res.status(500).json({ message: errorMessage, code: errorCode });
  }
}
