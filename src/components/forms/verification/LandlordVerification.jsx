"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/common/FileUpload";
import { cn } from "@/lib/utils";

export default function LandlordVerification({
  formData,
  updateFormData,
  nextStep,
}) {
  const [verificationData, setVerificationData] = useState(
    formData.verificationData || {
      ownershipDoc: null,
      acceptTerms: false,
    }
  );

  const handleFileUpload = (file) => {
    const newData = { ...verificationData, ownershipDoc: file };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
  };

  const handleTermsChange = (checked) => {
    const newData = { ...verificationData, acceptTerms: checked };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
  };

  const canProceed =
    verificationData.ownershipDoc && verificationData.acceptTerms;

  // const handleGetStarted = () => {
  //   if (canProceed) {
  //     nextStep();
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rentyard-card">
        <CardHeader className="bg-background-card rounded-t-xl">
          <CardTitle className="text-xl font-semibold text-text-primary">
            Proof of Ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <Label className="text-base font-semibold text-text-primary mb-2 block">
              Ownership Document <span className="rentyard-required">*</span>
            </Label>
            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes=".pdf"
              maxSize={10}
              currentFile={verificationData.ownershipDoc}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={verificationData.acceptTerms}
              onCheckedChange={handleTermsChange}
              className="mt-1"
            />
            <Label
              htmlFor="terms"
              className="text-base font-semibold text-text-primary cursor-pointer"
            >
              Accept RentYard property adding terms & conditions
            </Label>
          </div>

          {/* Get Started Button */}
          {/* <div className="pt-4">
            <Button
              onClick={handleGetStarted}
              disabled={!canProceed}
              className={cn(
                "rentyard-button w-full",
                !canProceed && "opacity-50 cursor-not-allowed"
              )}
            >
              Get Started
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
