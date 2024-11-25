import { useSearchParams } from "react-router-dom";

const Completion = () => {
  const [searchParams] = useSearchParams();

  // Extract query parameters
  const paymentIntent = searchParams.get("payment_intent");
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret"
  );
  const redirectStatus = searchParams.get("redirect_status");

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-full bg-secondary ">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

        {redirectStatus === "succeeded" ? (
          <div>
            <p className="text-green-500 font-semibold">Payment Successful!</p>
            <p className="mt-4">
              Your payment intent ID:{" "}
              <span className="font-mono">{paymentIntent}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This ID can be used for future reference.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-red-500 font-semibold">
              Payment Failed or Pending!
            </p>
            <p className="mt-4">Please try again or contact support.</p>
          </div>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-secondary text-black px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Completion;
