
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckoutButton } from "@/components/payment/StripeCheckout";

interface PlanFeature {
  id: string;
  name: string;
  includedIn: ('free' | 'premium' | 'advanced')[];
}

export const SubscriptionPlans: React.FC = () => {
  const features: PlanFeature[] = [
    { id: '1', name: 'Basic learning resources', includedIn: ['free', 'premium', 'advanced'] },
    { id: '2', name: 'Resource categorization', includedIn: ['free', 'premium', 'advanced'] },
    { id: '3', name: 'Limited quizzes (5 per week)', includedIn: ['free', 'premium', 'advanced'] },
    {
      id: '4',
      name: 'Unlimited quizzes & practice tests',
      includedIn: ['premium', 'advanced']
    },
    {
      id: '5',
      name: 'Offline access to resources',
      includedIn: ['premium', 'advanced']
    },
    { id: '6', name: 'Ad-free experience', includedIn: ['premium', 'advanced'] },
    {
      id: '7',
      name: 'Personalized learning paths',
      includedIn: ['premium', 'advanced']
    },
    {
      id: '8',
      name: 'Advanced progress analytics',
      includedIn: ['advanced']
    },
    {
      id: '9',
      name: 'Personalized coaching sessions',
      includedIn: ['advanced']
    },
    {
      id: '10',
      name: 'Priority email support',
      includedIn: ['advanced']
    },
    {
      id: '11',
      name: 'Exclusive advanced content',
      includedIn: ['advanced']
    }
  ];

  const billingOptions = {
    monthly: [
      {
        id: 'free',
        name: 'Free',
        description: 'Basic access to certification resources',
        price: '$0',
        period: 'forever',
        popular: false,
        buttonText: 'Current Plan',
        buttonDisabled: true,
        buttonVariant: 'outline',
        priceId: ''  // No price ID for free plan
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Unlimited access with enhanced features',
        price: '$4.99',
        period: 'per month',
        popular: true,
        buttonText: 'Upgrade Now',
        buttonDisabled: false,
        buttonVariant: 'default',
        priceId: 'price_1OkWXXXXXXXXXXX_monthly'  // Replace with actual Stripe price ID
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complete solution with exclusive features',
        price: '$7.99',
        period: 'per month',
        popular: false,
        buttonText: 'Get Advanced',
        buttonDisabled: false,
        buttonVariant: 'outline',
        priceId: 'price_1OkWXXXXXXXXXXX_monthly'  // Replace with actual Stripe price ID
      }
    ],
    yearly: [
      {
        id: 'free',
        name: 'Free',
        description: 'Basic access to certification resources',
        price: '$0',
        period: 'forever',
        popular: false,
        buttonText: 'Current Plan',
        buttonDisabled: true,
        buttonVariant: 'outline',
        priceId: ''  // No price ID for free plan
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Unlimited access with enhanced features',
        price: '$49.99',
        period: 'per year',
        popular: true,
        buttonText: 'Upgrade Now',
        buttonDisabled: false,
        buttonVariant: 'default',
        priceId: 'price_1OkWXXXXXXXXXXX_yearly'  // Replace with actual Stripe price ID
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complete solution with exclusive features',
        price: '$79.99',
        period: 'per year',
        popular: false,
        buttonText: 'Get Advanced',
        buttonDisabled: false,
        buttonVariant: 'outline',
        priceId: 'price_1OkWXXXXXXXXXXX_yearly'  // Replace with actual Stripe price ID
      }
    ]
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex flex-col items-center space-y-4">
          <TabsList className="grid w-48 grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(billingOptions).map(([period, plans]) => (
          <TabsContent key={period} value={period} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={cn(
                    "flex flex-col", 
                    plan.popular && "border-primary shadow-md relative overflow-hidden"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md bg-primary text-primary-foreground">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <h4 className="text-sm font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {features.map((feature) => {
                        const included = feature.includedIn.includes(plan.id as any);
                        return (
                          <li 
                            key={feature.id} 
                            className={cn(
                              "flex items-start gap-2", 
                              !included && "text-muted-foreground/60"
                            )}
                          >
                            <Check 
                              className={cn(
                                "h-4 w-4 mt-0.5", 
                                included ? "text-green-500" : "text-muted-foreground/60"
                              )} 
                            />
                            <span className="text-sm">{feature.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    {plan.id === 'free' ? (
                      <CheckoutButton 
                        priceId=""
                        planName={plan.name}
                        buttonText={plan.buttonText}
                        buttonVariant={plan.buttonVariant as any}
                        disabled={plan.buttonDisabled}
                        className="w-full"
                      />
                    ) : (
                      <CheckoutButton 
                        priceId={plan.priceId}
                        planName={plan.name}
                        buttonText={plan.buttonText}
                        buttonVariant={plan.buttonVariant as any}
                        disabled={plan.buttonDisabled}
                        className="w-full"
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include access to our community forums and basic support.</p>
        <p className="mt-1">Premium and Advanced plans are billed in one payment.</p>
      </div>
    </div>
  );
};
