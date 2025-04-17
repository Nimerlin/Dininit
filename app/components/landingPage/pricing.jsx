export const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      displayPrice: "₹199 / month",
      numericPrice: 199,
      description: "Access to basic monitoring capabilities.",
      features: [
        "Real-time server metrics",
        "1 dashboard limit",
        "7-day data retention",
      ],
    },
    {
      name: "Standard",
      displayPrice: "₹499 / month",
      numericPrice: 499,
      description: "Unlock advanced monitoring and visualization.",
      features: [
        "Unlimited dashboards",
        "30-day data retention",
        "Custom alerts",
        "Basic email notifications",
      ],
    },
    {
      name: "Premium",
      displayPrice: "₹999 / month",
      numericPrice: 999,
      description: "All features with high scalability and priority support.",
      features: [
        "Unlimited dashboards and users",
        "1-year data retention",
        "Real-time streaming & historical insights",
        "Advanced alert rules (threshold, anomaly detection)",
        "SMS & Email notifications",
        "Team collaboration features",
        "Dark mode & custom theming",
        "Priority support & SLA",
        "Plugin support & API access",
        "Export reports (PDF, CSV)",
      ],
    },
  ];

  const handlePurchaseClick = () => {
    window.location.href = "http://localhost:3000/payment";
  };

  return (
    <div className="mt-20">
      <h1 className="text-center text-6xl max-sm:text-5xl font-bold text-white">
        Packages
      </h1>
      <div className="flex sm:space-x-4 max-sm:space-y-4 max-sm:flex-col">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex-1 text-xl mt-10 rounded-xl border border-[#9966FF]/25 bg-[#0A1B51] p-10 w-full shadow-lg"
          >
            <div className="text-[#9966FF] font-semibold text-2xl">
              {plan.name} Plan
            </div>
            <div className="text-6xl my-2 font-light text-white">
              {plan.displayPrice}
            </div>
            <div className="text-white opacity-90">{plan.description}</div>
            <button
              className="my-5 w-full text-white p-5 max-sm:p-2 rounded-3xl bg-[#9966FF] text-xl max-sm:text-lg hover:bg-[#7a4fff] transition-all"
              onClick={handlePurchaseClick}
            >
              Purchase
            </button>
            <ul className="list-disc list-inside space-y-1 text-white text-base">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
