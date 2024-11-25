import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { useParams } from "react-router-dom";

function Payment() {
  const [stripePromise, setstripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { id } = useParams();
  const getClientKey = async () => {
    try {
      // Create an order and get the order ID
      const { data: orderData } = await axios.post(
        process.env.REACT_APP_API_URL + "/order/",
        {
          courseId: id, // Replace with actual course ID
        },
        {
          withCredentials: true,
        }
      );
      console.log("orderData : ", orderData);
      const { data: paymentData } = await axios.post(
        process.env.REACT_APP_API_URL + "/payment_create",
        {
          amount: orderData.amount,
          orderId: orderData.order._id,
        },
        {
          withCredentials: true,
        }
      );

      setClientSecret(paymentData.clientSecret);
    } catch (error) {
      console.log("Error fetching client secret:", error);
    }
  };
  const loadStripeScript = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      if (!stripe) {
        throw new Error("Stripe.js failed to load");
      }
      setstripePromise(stripe);
    } catch (error) {
      console.error("Error loading Stripe.js:", error.message);
    }
  };

  useEffect(() => {
    loadStripeScript();
    getClientKey();
  }, []);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center pt-[120px]">
      <h1 className="text-[1.5rem] font-bold mb-4">
        Stripe Payment Integration
      </h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Loading payment form...</p>
      )}
    </div>
  );
}

export default Payment;
