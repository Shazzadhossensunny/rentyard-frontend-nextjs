"use client";

import { useCallback } from "react";
import Header from "@/components/layout/Header";
import PropertyInfoForm from "@/components/forms/PropertyInfoForm";
import PlanSelection from "@/components/forms/PlanSelection";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import CombinedStep from "@/components/forms/CombinedStep";

export default function Home() {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    isStepValid,
  } = useMultiStepForm();

  // Create a batched update function
  const batchedUpdateFormData = useCallback(
    (newData) => {
      requestAnimationFrame(() => {
        updateFormData(newData);
      });
    },
    [updateFormData]
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CombinedStep
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <PropertyInfoForm
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PlanSelection
            formData={formData}
            updateFormData={batchedUpdateFormData}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStep={currentStep} />
      <main className="container mx-auto px-4 py-8">{renderCurrentStep()}</main>
    </div>
  );
}
