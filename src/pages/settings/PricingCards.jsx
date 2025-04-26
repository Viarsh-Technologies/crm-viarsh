import React from 'react';

const PricingCard = ({ title, leads, emailText, price }) => {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg w-[306px] h-[459px] flex flex-col justify-between p-4">
      <div className="mt-7">
        <h3 className="text-[32px] font-bold text-center mb-6">
          {title}
        </h3>
        
        {/* Wrapper for leads and emailText with equal vertical spacing */}
        <div className="my-[85px]">
          <p className="text-[16px] font-semibold text-center mb-1">
            {leads}
          </p>
          <p className="text-[16px] font-semibold text-center">
            {emailText}
          </p>
        </div>

        <p className="text-[24px] font-semibold text-center">
          {price}
        </p>
      </div>

      <div className="flex justify-center">
        <button className="w-[152px] h-[47px] bg-brand-green text-white py-2 rounded-md mt-8">
          Buy Now
        </button>
      </div>
    </div>
  );
};


// Pricing Cards Container
const PricingCards = () => {
  return (
    <div>
      <p className="text-1xl font-bold text-start mb-8">Pricing</p>
      <div className="flex flex-wrap justify-start gap-6">
        <PricingCard
          title="Accelerate"
          leads="750 Leads Per Month"
          emailText="Approximately 2250 emails"
          price="$225/month"
        />
        <PricingCard
          title="Supercharge"
          leads="1500 Leads Per Month"
          emailText="Approximately 4500 emails"
          price="$400/month"
        />
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
