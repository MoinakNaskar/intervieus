import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Check, 
  Star,
  Zap,
  Users,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";

async function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 AI interviews per month",
        "Basic resume analysis",
        "Standard job matching",
        "Community support"
      ],
      buttonText: "Get Started",
      buttonVariant: "secondary" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Best for active job seekers",
      features: [
        "Unlimited AI interviews",
        "Advanced resume analysis & scoring",
        "AI-powered resume generator",
        "Priority job matching",
        "Interview feedback & analytics",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "primary" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Custom interview scenarios",
        "Advanced analytics & reporting",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false
    }
  ];

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Choose Your Plan</h2>
          <p className="text-lg">
            Unlock your full potential with our AI-powered interview preparation platform
          </p>
        </div>

        <div className="max-sm:hidden">
          <Crown className="w-32 h-32 text-primary-200" />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <div className="text-center">
          <h2>Simple, Transparent Pricing</h2>
          <p className="text-lg text-light-100 mt-2">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}>
              {plan.popular && (
                <div className="popular-badge">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="pricing-header">
                <h3 className="pricing-name">{plan.name}</h3>
                <div className="pricing-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">/{plan.period}</span>
                </div>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="pricing-feature">
                    <Check className="w-5 h-5 text-success-100" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${plan.buttonVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Why Choose InterVeus Pro?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Zap className="w-8 h-8 text-primary-200" />
            </div>
            <h3>Unlimited Practice</h3>
            <p>Practice as many interviews as you need with our AI interviewer</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles className="w-8 h-8 text-primary-200" />
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Get detailed feedback and suggestions to improve your performance</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Shield className="w-8 h-8 text-primary-200" />
            </div>
            <h3>Confidence Building</h3>
            <p>Build confidence through realistic interview simulations</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Clock className="w-8 h-8 text-primary-200" />
            </div>
            <h3>Time-Saving</h3>
            <p>Practice anytime, anywhere without scheduling conflicts</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I cancel my subscription anytime?</h3>
            <p>Yes, you can cancel your subscription at any time. No questions asked.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer a free trial?</h3>
            <p>Yes, we offer a 7-day free trial for our Pro plan to help you get started.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
          
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>Absolutely. We use enterprise-grade security to protect your personal information.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PricingPage; 