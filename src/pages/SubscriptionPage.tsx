
import React from 'react';
import Layout from '@/components/Layout';
import { SubscriptionPlans } from '@/components/learning/SubscriptionPlans';
import { StripeProvider } from '@/components/payment/StripeCheckout';

const SubscriptionPage: React.FC = () => {
  return (
    <Layout>
      <StripeProvider>
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
            <p className="text-muted-foreground mt-2">
              Choose the perfect plan to accelerate your certification journey
            </p>
          </div>
          
          <SubscriptionPlans />
        </div>
      </StripeProvider>
    </Layout>
  );
};

export default SubscriptionPage;
