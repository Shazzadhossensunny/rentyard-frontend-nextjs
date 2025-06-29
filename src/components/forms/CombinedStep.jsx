"use client";

import { useState, useEffect } from "react";
import PropertyTypeSelection from "./PropertyTypeSelection";
import RoleSelection from "./RoleSelection";
import LandlordVerification from "./verification/LandlordVerification";
import PropertyManagementVerification from "./verification/PropertyManagementVerification";
import RealtorVerification from "./verification/RealtorVerification";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CombinedStep({ formData, updateFormData, nextStep }) {
  const [canProceed, setCanProceed] = useState(false);

  const selectedRole = formData.userRole;
  const selectedType = formData.propertyType;
  const verificationData = formData.verificationData;

  // Validate if verification is complete
  useEffect(() => {
    const isPropertySelected = selectedType === "condominiums";
    const isRoleSelected = !!selectedRole;

    const isVerificationComplete = () => {
      if (!verificationData) return false;

      switch (selectedRole) {
        case "landlord":
          return verificationData.ownershipDoc && verificationData.acceptTerms;
        case "realtor":
          return (
            verificationData.licenseNumber &&
            verificationData.additionalDocs &&
            verificationData.agreementDoc &&
            verificationData.acceptTerms
          );
        case "property-management":
          return (
            verificationData.companyName &&
            verificationData.companyEIN &&
            verificationData.companyTIN &&
            verificationData.companyDoc &&
            verificationData.streetAddress &&
            verificationData.phone &&
            verificationData.email &&
            verificationData.city &&
            verificationData.state &&
            verificationData.zipCode &&
            verificationData.acceptTerms
          );
        default:
          return false;
      }
    };

    setCanProceed(
      isPropertySelected && isRoleSelected && isVerificationComplete()
    );
  }, [selectedType, selectedRole, verificationData]);

  const renderVerificationForm = () => {
    if (selectedType !== "condominiums" || !selectedRole) return null;

    switch (selectedRole) {
      case "landlord":
        return (
          <LandlordVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={() => {}}
          />
        );
      case "realtor":
        return (
          <RealtorVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={() => {}}
          />
        );
      case "property-management":
        return (
          <PropertyManagementVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-32">
      <div className="grid grid-cols-1 gap-10">
        <PropertyTypeSelection
          formData={formData}
          updateFormData={updateFormData}
          nextStep={() => {}}
        />
        <RoleSelection
          formData={formData}
          updateFormData={updateFormData}
          nextStep={() => {}}
          prevStep={() => {}}
        />
      </div>

      <div className="mt-12">{renderVerificationForm()}</div>

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            disabled
            className="flex items-center gap-2 text-text-primary font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={() => canProceed && nextStep()}
            disabled={!canProceed}
            className={`rentyard-button px-8 py-3 text-lg ${
              !canProceed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
