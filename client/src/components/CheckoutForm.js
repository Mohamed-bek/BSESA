import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, course }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("The Client Secret: ", clientSecret);
  }, [clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again later.");
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment with the client secret using the PaymentElement
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/completion/`,
        },
      });

      if (error) {
        setError(error.message);
        setSuccess(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment processing. You will receive confirmation soon.");
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setSuccess(false);
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-full h-fit shadow-lg flex justify-center overflow-auto">
      <form
        className="bg-white text-black text-[2rem] min-w-[400px] max-w-[800px] font-bold p-6 rounded-lg shadow-lg overflow-y-auto h-fit"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6">Enter Payment Details</h2>

        {/* Stripe Payment Element */}
        <div className="mb-4">
          <PaymentElement
            id="payment-element"
            className="p-3 border rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="bg-primary text-white block mx-auto text-[1.35rem] rounded-md py-2 px-4  disabled:opacity-50 mt-4"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {message && <div className="mt-4 text-green-500">{message}</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && (
          <div className="mt-4 text-green-500">
            Payment succeeded! Thank you for your purchase.
          </div>
        )}
      </form>
    </div>
  );
}
