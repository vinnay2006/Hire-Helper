import React, { useEffect } from "react";

function Checkout() {
  useEffect(() => {
 
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_RC23WgCKYDDbow", //my  Razorpay Key ID
      amount: "50000", // Amount in paise (50000 = INR 500)
      currency: "INR",
      name: "My Store",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_RC25Ql1KeOeHrG", //it will be  Replaced with order_id from backend
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Demo Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Razorpay Checkout Example</h2>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-white-600 text-black rounded-lg "
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

export default Checkout;




