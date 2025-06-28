"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [verificationData, setVerificationData] = useState(
    formData.verificationData || {
      licenseNumber: "",
      additionalDocs: null,
      agreementDoc: null,
      acceptTerms: false,
    }
  );

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
    <div className="max-w-2xl mx-auto">
      <Card className="rentyard-card">
        <CardHeader className="bg-background-card rounded-t-xl">
          <CardTitle className="text-xl font-semibold text-text-primary">
            Realtor Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
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
              onFileSelect={(file) => handleFileUpload("additionalDocs", file)}
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

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="realtor-terms"
              checked={verificationData.acceptTerms}
              onCheckedChange={(checked) =>
                handleInputChange("acceptTerms", checked)
              }
              className="mt-1"
            />
            <Label
              htmlFor="realtor-terms"
              className="text-base font-semibold text-text-primary cursor-pointer"
            >
              Accept RentYard property adding terms & conditions
            </Label>
          </div>

          {/* Get Started Button */}
          <div className="pt-4">
            <Button
              onClick={() => canProceed && nextStep()}
              disabled={!canProceed}
              className={cn(
                "rentyard-button w-full",
                !canProceed && "opacity-50 cursor-not-allowed"
              )}
            >
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
