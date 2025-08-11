// src/pages/Checkout.js
// This component handles the checkout form and initiates the payment process.

import React, { useState } from 'react';
// Tailwind CSS is assumed to be available globally in this React setup.
// No explicit CSS import needed if using Tailwind classes directly.

const Checkout = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    amount: 10000, // Example amount in IDR (Rp 10,000)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // For user messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      // Get the current origin (e.g., "http://localhost:3000" or "https://your-domain.com")
      const currentOrigin = window.location.origin;

      // Construct the success and failure redirect URLs
      // You should have React Router or similar setup for these paths
      const successUrl = `${currentOrigin}/payment-success`;
      const failureUrl = `${currentOrigin}/payment-failure`;

      // Combine form data with redirect URLs
      const payload = {
        ...formData,
        success_redirect_url: successUrl,
        failure_redirect_url: failureUrl,
      };

      // Step 1: Call the Vercel serverless function to create the payment link
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the payload with redirect URLs
      });

      if (!response.ok) {
        // Attempt to parse error message from server response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment link. Please try again.');
      }

      const data = await response.json();
      const { paymentUrl } = data;

      if (paymentUrl) {
        // Step 2: Redirect the user to the Xendit payment link
        setMessage('Redirecting to payment page...');
        window.location.href = paymentUrl;
      } else {
        throw new Error('Payment URL not received from the server. Something went wrong.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
      setLoading(false); // Stop loading on error
      setMessage(''); // Clear any previous messages
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Secure Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="e.g., john.doe@example.com"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Amount to Pay:
            </label>
            <p className="text-xl font-bold text-green-600">
              Rp {formData.amount.toLocaleString('id-ID')}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-bold transition duration-300 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg'
            }`}
          >
            {loading ? 'Processing Payment...' : 'Proceed to Payment'}
          </button>

          {message && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-center border border-red-300">
              Error: {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
