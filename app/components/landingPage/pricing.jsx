
export const Pricing = () => {
  const plans = [
    { name: "Basic", displayPrice: "₹199 / month", numericPrice: 199, description: "Access to basic features." },
    { name: "Standard", displayPrice: "₹499 / month", numericPrice: 499, description: "Unlock all features." },
    { name: "Premium", displayPrice: "₹999 / month", numericPrice: 999, description: "All features and priority support." }
  ];

  const handlePurchaseClick = () => {
    window.location.href = "http://localhost:3000/payment";
  };

  return (
    <div className="mt-20">
      <h1 className="text-center text-6xl max-sm:text-5xl font-bold">
        Packages
      </h1>
      <div className="flex sm:space-x-4 max-sm:space-y-4 max-sm:flex-col">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex-1 text-xl mt-10 rounded-xl border border-[#9966FF]/25 bg-[#1A1528] p-10 w-full`}
          >
            <div className={`text-[#9966FF]`}>{plan.name} Plan</div>
            <div className="text-6xl my-2 font-light">{plan.displayPrice}</div>
            <div>{plan.description}</div>
            <button
              className="my-5 w-full text-white p-5 max-sm:p-2 rounded-3xl bg-indigo-600 text-xl max-sm:text-lg hover:bg-indigo-700 transition-all"
              onClick={handlePurchaseClick}
            >
              Purchase
            </button>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
