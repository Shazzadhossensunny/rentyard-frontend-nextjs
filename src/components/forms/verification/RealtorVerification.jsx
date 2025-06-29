"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/common/FileUpload";
import { cn } from "@/lib/utils";

export default function RealtorVerification({
  formData,
  updateFormData,
  nextStep,
}) {
  const [verificationData, setVerificationData] = useState({
    licenseNumber: "",
    additionalDocs: null,
    agreementDoc: null,
    acceptTerms: false,
    // Merge with existing data if it exists
    ...(formData.verificationData || {}),
  });

  const handleInputChange = (field, value) => {
    const newData = { ...verificationData, [field]: value };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
  };

  const handleFileUpload = (field, file) => {
    const newData = { ...verificationData, [field]: file };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
  };

  const canProceed =
    verificationData.licenseNumber &&
    verificationData.additionalDocs &&
    verificationData.agreementDoc &&
    verificationData.acceptTerms;

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="bg-background-card rounded-t-xl border-b border-[#E0E0E0]">
          <CardTitle className="text-lg font-medium text-[#6F6C6A]">
            Realtor Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* License Number */}
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                License Number <span className="rentyard-required">*</span>
              </Label>
              <Input
                type="number"
                value={verificationData.licenseNumber}
                onChange={(e) =>
                  handleInputChange("licenseNumber", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter your license number"
              />
            </div>

            {/* Additional Documents */}
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Additional Documents for Realtor{" "}
                <span className="rentyard-required">*</span>
              </Label>
              <FileUpload
                onFileSelect={(file) =>
                  handleFileUpload("additionalDocs", file)
                }
                acceptedTypes=".pdf"
                maxSize={10}
                currentFile={verificationData.additionalDocs}
              />
            </div>

            {/* Agreement with Landlord */}
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Agreement with Landlord{" "}
                <span className="rentyard-required">*</span>
              </Label>
              <FileUpload
                onFileSelect={(file) => handleFileUpload("agreementDoc", file)}
                acceptedTypes=".pdf"
                maxSize={10}
                currentFile={verificationData.agreementDoc}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="realtor-terms"
              checked={verificationData.acceptTerms}
              onCheckedChange={(checked) =>
                handleInputChange("acceptTerms", checked)
              }
              className={cn(
                "mt-1 h-4 w-4 rounded border border-[#D1D5DB]",
                "data-[state=checked]:border-[#272B35] data-[state=checked]:bg-transparent",
                "data-[state=checked]:text-[#272B35]",
                "focus:ring-2 focus:ring-[#272B35] focus:ring-offset-2"
              )}
            />
            <Label
              htmlFor="realtor-terms"
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
