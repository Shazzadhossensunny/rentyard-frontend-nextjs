"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LandlordVerification from "./verification/LandlordVerification";
import RealtorVerification from "./verification/RealtorVerification";
import PropertyManagementVerification from "./verification/PropertyManagementVerification";

export default function VerificationForms({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const renderVerificationForm = () => {
    switch (formData.userRole) {
      case "landlord":
        return (
          <LandlordVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case "realtor":
        return (
          <RealtorVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case "property-management":
        return (
          <PropertyManagementVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      default:
        return <div>Please select a role first.</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={prevStep}
          className="flex items-center gap-2 text-text-primary font-semibold hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Verification Form */}
      {renderVerificationForm()}
    </div>
  );
}
