
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PlanFeature {
  id: string;
  name: string;
  includedIn: ('free' | 'premium' | 'lifetime')[];
}

export const SubscriptionPlans: React.FC = () => {
  const features: PlanFeature[] = [
    { id: '1', name: 'Basic learning resources', includedIn: ['free', 'premium', 'lifetime'] },
    { id: '2', name: 'Resource categorization', includedIn: ['free', 'premium', 'lifetime'] },
    { id: '3', name: 'Limited flashcards', includedIn: ['free', 'premium', 'lifetime'] },
    { id: '4', name: 'Personalized learning paths', includedIn: ['premium', 'lifetime'] },
    { id: '5', name: 'Unlimited AI-generated flashcards', includedIn: ['premium', 'lifetime'] },
    { id: '6', name: 'Advanced analytics & progress tracking', includedIn: ['premium', 'lifetime'] },
    { id: '7', name: 'Adaptive practice exams', includedIn: ['premium', 'lifetime'] },
    { id: '8', name: 'Priority AI assistant access', includedIn: ['premium', 'lifetime'] },
    { id: '9', name: 'All future certification updates', includedIn: ['lifetime'] },
    { id: '10', name: 'Offline access to all content', includedIn: ['lifetime'] },
    { id: '11', name: 'Exclusive webinars & workshops', includedIn: ['lifetime'] }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access to certification resources',
      price: '$0',
      period: 'forever',
      popular: false,
      buttonText: 'Current Plan',
      buttonDisabled: true,
      buttonVariant: 'outline'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Full access to all certification tools',
      price: '$14.99',
      period: 'per month',
      popular: true,
      buttonText: 'Upgrade Now',
      buttonDisabled: false,
      buttonVariant: 'default'
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      description: 'One-time purchase for perpetual access',
      price: '$299',
      period: 'one time',
      popular: false,
      buttonText: 'Buy Lifetime',
      buttonDisabled: false,
      buttonVariant: 'outline'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Subscription Plans</h2>
        <p className="text-muted-foreground">
          Choose the perfect plan for your certification journey
        </p>
      </div>
      
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
                        className={cn("h-4 w-4 mt-0.5", included ? "text-green-500" : "text-muted-foreground/60")} 
                      />
                      <span className="text-sm">{feature.name}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant={plan.buttonVariant as any} 
                className="w-full" 
                disabled={plan.buttonDisabled}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include access to our community forums and basic support.</p>
        <p className="mt-1">Premium and Lifetime plans include priority email support.</p>
      </div>
    </div>
  );
};
