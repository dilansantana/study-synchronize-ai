
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/services/stripe';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CheckoutButtonProps {
  priceId: string;
  buttonText: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  planName: string;
  className?: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  priceId,
  buttonText,
  buttonVariant = 'default',
  disabled = false,
  planName,
  className,
}) => {
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      // In a real application, this would call your backend API to create a checkout session
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId }),
      // });
      
      // const { sessionId } = await response.json();
      
      // Mock session ID for demonstration
      const sessionId = `cs_test_${Math.random().toString(36).substr(2, 9)}`;
      
      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load Stripe');
      
      // For demo purposes, show a toast instead of redirecting
      toast({
        title: "Checkout initiated",
        description: `You're subscribing to the ${planName} plan. In a real app, you would be redirected to Stripe.`,
      });
      
      // In a real application, you would uncomment this:
      // const { error } = await stripe.redirectToCheckout({ sessionId });
      // if (error) throw error;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Checkout failed",
        description: "There was a problem initiating checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant={buttonVariant as any} 
      className={className}
      disabled={disabled}
      onClick={handleCheckout}
    >
      {buttonText}
    </Button>
  );
};

export const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};
