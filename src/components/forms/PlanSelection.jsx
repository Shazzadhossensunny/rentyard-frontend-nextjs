"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { PLANS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import Footer from "../layout/Footer";
import PaymentModal from "../modals/PaymentModal";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function PlanSelection({ formData, updateFormData, prevStep }) {
  const [selectedPlan, setSelectedPlan] = useState(formData.selectedPlan || "");
  const [paymentMethod, setPaymentMethod] = useState(
    formData.paymentInfo?.method || ""
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    updateFormData({ selectedPlan: planId });
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    updateFormData({
      paymentInfo: { ...formData.paymentInfo, method },
    });
  };

  const handlePaymentSubmit = (cardInfo) => {
    updateFormData({
      paymentInfo: { ...formData.paymentInfo, ...cardInfo },
    });
    setShowPaymentModal(false);
  };

  const handlePayAndAdd = () => {
    // In a real app, this would process payment
    setShowSuccess(true);
    setTimeout(() => nextStep(), 2000);
  };

  const nextStep = () => {
    // This would navigate to the next page
    alert("Payment successful! Property added.");
  };

  const totalAmount = selectedPlan
    ? PLANS.find((plan) => plan.id === selectedPlan).price
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-text-primary mb-8">
        Choose a plan for after 30-days free trial
      </h2>

      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
          <Button
            variant={formData.billingCycle === "monthly" ? "default" : "ghost"}
            className={cn(
              "px-6 py-3",
              formData.billingCycle !== "monthly" && "bg-transparent"
            )}
            onClick={() => updateFormData({ billingCycle: "monthly" })}
          >
            Monthly
          </Button>
          <Button
            variant={formData.billingCycle === "annually" ? "default" : "ghost"}
            className={cn(
              "px-6 py-3",
              formData.billingCycle !== "annually" && "bg-transparent"
            )}
            onClick={() => updateFormData({ billingCycle: "annually" })}
          >
            Annually (save 57%)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "rentyard-card cursor-pointer transition-all",
              selectedPlan === plan.id && "border-primary bg-secondary"
            )}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                {selectedPlan === plan.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${plan.price.toFixed(2)}/mo
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 mt-1 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rentyard-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Payment option</h3>
          <Button variant="outline" onClick={() => setShowPaymentModal(true)}>
            Add new card
          </Button>
        </div>

        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentSelect}
          className="space-y-4"
        >
          {formData.paymentInfo?.cards?.map((card, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={card.id} id={`card-${index}`} />
              <Label
                htmlFor={`card-${index}`}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  {card.type === "visa" ? "VISA" : "MC"}
                </div>
                <span>**** **** **** {card.last4}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-semibold">
          Total: <span className="text-primary">${totalAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={handlePayAndAdd}
          disabled={!selectedPlan || !paymentMethod}
          className={cn(
            "rentyard-button px-8 py-3",
            (!selectedPlan || !paymentMethod) && "opacity-50 cursor-not-allowed"
          )}
        >
          Pay & Add Property
        </Button>
      </div>

      <Footer
        currentStep={3}
        totalSteps={3}
        onBack={prevStep}
        onNext={handlePayAndAdd}
        disabled={!selectedPlan || !paymentMethod}
      />

      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handlePaymentSubmit}
      />

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-lg mb-6">
              Your property has been added successfully.
            </p>
            <Button onClick={nextStep} className="rentyard-button">
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
