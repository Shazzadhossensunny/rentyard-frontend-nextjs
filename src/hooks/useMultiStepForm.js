"use client";

import { useState, useCallback } from "react";

export default function useMultiStepForm(totalSteps = 5) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    userRole: "",
    verificationData: {},
    propertyInfo: {
      addresses: [],
      petFees: [],
      leasingInfo: [],
      parking: [],
      charges: [],
      educationalInstitutions: [],
      rentFrequency: [],
      nearestStations: [],
      applicationAgreement: null,
      nearestLandmarks: [],
      aboutProperty: "",
      utilitiesProviders: [],
      amenities: [],
      propertyGallery: {
        featuredPhoto: null,
        morePhotos: [],
        videos: [],
      },
    },
    selectedPlan: "",
    paymentInfo: {},
  });

  const updateFormData = useCallback((newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      propertyType: "",
      userRole: "",
      verificationData: {},
      propertyInfo: {
        addresses: [],
        petFees: [],
        leasingInfo: [],
        parking: [],
        charges: [],
        educationalInstitutions: [],
        rentFrequency: [],
        nearestStations: [],
        applicationAgreement: null,
        nearestLandmarks: [],
        aboutProperty: "",
        utilitiesProviders: [],
        amenities: [],
        propertyGallery: {
          featuredPhoto: null,
          morePhotos: [],
          videos: [],
        },
      },
      selectedPlan: "",
      paymentInfo: {},
    });
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.propertyType === "condominiums";
      case 2:
        return formData.userRole !== "";
      case 3:
        return validateVerificationData();
      case 4:
        return validatePropertyInfo();
      case 5:
        return formData.selectedPlan !== "";
      default:
        return false;
    }
  };

  const validateVerificationData = () => {
    const { verificationData, userRole } = formData;

    switch (userRole) {
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
          verificationData.acceptTerms
        );
      default:
        return false;
    }
  };

  const validatePropertyInfo = () => {
    const { propertyInfo } = formData;
    return (
      propertyInfo.addresses.length > 0 &&
      propertyInfo.charges.length > 0 &&
      propertyInfo.leasingInfo.length > 0
    );
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isStepValid,
    totalSteps,
  };
}
