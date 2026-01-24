import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function PlanUpgradePage(){
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [hoveredPlan, setHoveredPlan] = useState(null);
    const [planType, setPlanType] = useState('personal');

    const plans = [
        {
            id: 'current',
            name: 'Your current plan',
            price: null,
            features: [
                'Can View Workers',
                'Can send a request to worker',
                'Can hire Workers',
                'Can add review for them'
            ],
            cta: null,
            popular: false,
            color: 'bg-gray-50',
            borderColor: 'border-gray-200'
        },
        {
            id: 'go',
            name: 'Go',
            price: 2000,
            description: 'Valid For Three Months',
            features: [
                'Can View Workers',
                'Can send a request to worker',
                'Can hire Workers',
                'Can add review for them',
                'Can create a worker profile for you',
                'Can do the payment transaction through this site',
                'Can get the Client requests and can approve them',
            ],
            cta: 'Upgrade to Go',
            popular: false,
            color: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        {
            id: 'plus',
            name: 'Plus',
            price: 4000,
            description: 'Valid For Six Months',
            features: [
                'Can View Workers',
                'Can send a request to worker',
                'Can hire Workers',
                'Can add review for them',
                'Can create a worker profile for you',
                'Can do the payment transaction through this site',
                'Can get the Client requests and can approve them',
            ],
            cta: 'Get Plus',
            popular: true,
            color: 'bg-amber-50',
            borderColor: 'border-amber-300'
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 8000,
            description: 'Valid For One Year',
            features: [
                'Can View Workers',
                'Can send a request to worker',
                'Can hire Workers',
                'Can add review for them',
                'Can create a worker profile for you',
                'Can do the payment transaction through this site',
                'Can get the Client requests and can approve them',
            ],
            cta: 'Get Pro',
            popular: false,
            color: 'bg-purple-50',
            borderColor: 'border-purple-200'
        }
    ];

    

    const navigate = useNavigate();

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan.id);
        console.log(`Selected plan: ${plan.id}`);

       
        navigate("/payment", { state: { planName: plan.name, planPrice: plan.price } });
    };

    const PlanCard = ({ plan }) => {
        const isSelected = selectedPlan === plan.id;
        const isHovered = hoveredPlan === plan.id;

        return (
            <div
                className={`
          relative flex flex-col h-full p-6 rounded-xl border-2 transition-all duration-300
          ${plan.borderColor} ${plan.color}
          ${plan.popular ? 'border-amber-400' : ''}
          ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : ''}
          ${isHovered ? 'shadow-lg -translate-y-1' : 'shadow-md'}
        `}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
            >
                {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                            POPULAR
                        </span>
                    </div>
                )}

                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                    {plan.description && (
                        <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    )}

                    {plan.price !== null ? (
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-gray-900">Rs.{plan.price}</span>

                        </div>
                    ) : (
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-600">Free</span>
                        </div>
                    )}
                </div>

                <div className="mb-6 flex-grow">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                        what You can do
                    </h4>
                    <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-3 mt-0.5">✓</span>
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {plan.cta ? (
                   

                    <button
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${isSelected ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        onClick={() => handlePlanSelect(plan)}
                    >
                        {plan.cta}
                    </button>

                ) : (
                    <div className="w-full py-3 px-4 bg-gray-100 text-gray-600 font-semibold rounded-lg text-center">
                        Current Plan
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Upgrade your plan
                    </h1>


                </header>

                {/* Plan Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {plans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>

                {/* Selection Info */}
                <div className="bg-gray-50 rounded-xl p-8 mb-12 text-center">
                    {selectedPlan ? (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700">
                                You've selected the <span className="font-bold text-blue-600">
                                    {plans.find(p => p.id === selectedPlan)?.name}
                                </span> plan!
                            </p>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600">
                            Select a plan to see more details
                        </p>
                    )}
                </div>




            </div>
        </div>
    );
};

