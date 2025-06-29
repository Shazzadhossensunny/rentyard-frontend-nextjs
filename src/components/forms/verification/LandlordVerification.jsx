"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="bg-background-card rounded-t-xl border-b border-[#E0E0E0]">
          <CardTitle className="text-lg font-medium text-[#6F6C6A]">
            Proof of Ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <Label className="text-base font-semibold text-text-primary mb-2 block">
              Ownership doc <span className="rentyard-required">*</span>
            </Label>
            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes=".pdf"
              maxSize={10}
              currentFile={verificationData.ownershipDoc}
              className="w-full md:w-1/2 lg:w-1/3"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={verificationData.acceptTerms}
              onCheckedChange={handleTermsChange}
              className={cn(
                "mt-1 h-4 w-4 rounded border border-[#D1D5DB]",
                "data-[state=checked]:border-[#272B35] data-[state=checked]:bg-transparent",
                "data-[state=checked]:text-[#272B35]",
                "focus:ring-2 focus:ring-[#272B35] focus:ring-offset-2"
              )}
            />
            <Label
              htmlFor="terms"
              className="text-base font-semibold text-text-primary cursor-pointer"
            >
              Accept RentYard property adding terms & conditions
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
