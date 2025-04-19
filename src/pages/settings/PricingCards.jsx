import React from 'react';

const PricingCard = ({ title, leads, emailText, price }) => {
  return (
    <div className="bg-white border-1 border-[#E0E0E0] rounded-lg w-[300px] h-[400px]">
      <h3 className="text-2xl font-bold text-center mb-9">{title}</h3>
      <p className="text-md text-center mb-1">{leads}</p>
      <p className="text-md text-center mb-9">{emailText}</p>
      <p className="text-xl font-semibold text-center mb-8">{price}</p>
      <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition">
        Buy Now
      </button>
    </div>
  );
};

const PricingCards = () => {
  return (
    <div className="">
      <p className="text-1xl font-bold text-start mb-8">Pricing</p>
      <div className="flex flex-wrap justify-start gap-6">
        {/* Pricing Card 1 */}
        <PricingCard
          title="Accelerate"
          leads="750 Leads Per Month"
          emailText="Approximately 2250 emails"
          price="$225/month"
        />
        {/* Pricing Card 2 */}
        <PricingCard
          title="Supercharge"
          leads="1500 Leads Per Month"
          emailText="Approximately 4500 emails"
          price="$400/month"
        />
        {/* Pricing Card 3 */}
        <PricingCard
          title="Ultimate"
          leads="3000 Leads Per Month"
          emailText="Approximately 9000 emails"
          price="$750/month"
        />
      </div>
    </div>
  );
};

export default PricingCards;
