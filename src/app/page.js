"use client";

import { useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import PropertyTypeSelection from "@/components/forms/PropertyTypeSelection";
import RoleSelection from "@/components/forms/RoleSelection";
import VerificationForms from "@/components/forms/VerificationForms";
import PropertyInfoForm from "@/components/forms/PropertyInfoForm";
import PlanSelection from "@/components/forms/PlanSelection";
import useMultiStepForm from "@/hooks/useMultiStepForm";

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
          <PropertyTypeSelection
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <RoleSelection
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <VerificationForms
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <PropertyInfoForm
            formData={formData}
            updateFormData={batchedUpdateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
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
