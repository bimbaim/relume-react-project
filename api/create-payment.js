// api/create-payment.js
// This is your Vercel Serverless Function that interacts with the Xendit API.
// IMPORTANT: This file must be located directly under an 'api' directory at your project root.

// No Xendit SDK import needed for direct fetch approach

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', code: 'METHOD_NOT_ALLOWED' });
  }

  try {
    // Initialize Xendit within the handler to catch configuration errors
    if (!process.env.XENDIT_SECRET_KEY) {
      console.error('ERROR: XENDIT_SECRET_KEY is not set in environment variables!');
      return res.status(500).json({ message: 'Server configuration error: Xendit API key is missing.', code: 'SERVER_CONFIG_ERROR' });
    }

    const { customerName, email, amount } = req.body;

    // Basic validation
    if (!customerName || !email || !amount) {
      console.warn('Validation failed: Missing required fields.', { customerName, email, amount });
      return res.status(400).json({ message: 'Missing required fields: customerName, email, or amount.', code: 'MISSING_FIELDS' });
    }

    // Generate a unique external ID for the invoice
    const externalId = `invoice-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Prepare the data for the Xendit API call
    const invoiceData = {
      external_id: externalId, // Xendit API expects snake_case
      amount: amount,
      payer_email: email,       // Xendit API expects snake_case
      description: `Payment for order from ${customerName}`,
      // You can define success/failure redirect URLs specific to your app here
      // success_redirect_url: 'https://your-domain.com/payment-success',
      // failure_redirect_url: 'https://your-domain.com/payment-failure',
      // Add other optional fields as per Xendit API documentation if needed:
      // items: [],
      // fees: []
    };

    console.log('Attempting to create Xendit Invoice via direct fetch with data:', invoiceData);

    // Encode the secret key for Basic Authentication
    // Format: 'YOUR_SECRET_KEY:' (note the colon and empty password)
    const base64EncodedSecret = Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString('base64');

    // Make the direct fetch call to Xendit's Create Invoice API
    const xenditResponse = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64EncodedSecret}`,
      },
      body: JSON.stringify(invoiceData),
    });

    const xenditResult = await xenditResponse.json();

    if (!xenditResponse.ok) {
      // If Xendit API returns an error status (e.g., 400, 401, 403, 404)
      console.error('Xendit API returned an error:', xenditResult);
      // Xendit error responses often have a 'message' and 'error_code'
      let xenditErrorMessage = xenditResult.message || 'Unknown error from Xendit API.';
      let xenditErrorCode = xenditResult.error_code || 'XENDIT_API_ERROR';
      return res.status(xenditResponse.status).json({
        message: `Xendit API Error [${xenditErrorCode}]: ${xenditErrorMessage}`,
        code: xenditErrorCode
      });
    }

    console.log('Xendit Invoice created successfully:', xenditResult.id); // Log the invoice ID for tracking

    // Return the payment URL to the frontend
    return res.status(200).json({ paymentUrl: xenditResult.invoice_url }); // Xendit returns invoice_url in snake_case

  } catch (error) {
    console.error('Catch block entered: Error during direct Xendit API call:', error);
    let errorMessage = 'An unexpected error occurred on the server. Please try again later.';
    let errorCode = 'UNKNOWN_SERVER_ERROR';

    if (error instanceof Error) {
      errorMessage = error.message;
      errorCode = 'FETCH_ERROR'; // General network/fetch error
    } else if (typeof error === 'string') {
      errorMessage = error;
      errorCode = 'STRING_ERROR';
    }

    return res.status(500).json({ message: errorMessage, code: errorCode });
  }
}
