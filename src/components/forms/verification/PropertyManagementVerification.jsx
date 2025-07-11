"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/common/FileUpload";
import PhoneInput from "@/components/common/PhoneInput";
import { US_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEFAULT_VERIFICATION_DATA = {
  companyName: "",
  companyEIN: "",
  companyTIN: "",
  companyDoc: null,
  country: "United States",
  streetAddress: "",
  streetNumber: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  zipCode: "",
  acceptTerms: false,
};

export default function PropertyManagementVerification({
  formData,
  updateFormData,
  nextStep,
}) {
  const [verificationData, setVerificationData] = useState(() => {
    return {
      ...DEFAULT_VERIFICATION_DATA,
      ...(formData.verificationData || {}),
    };
  });

  // Use ref to track changes and update parent
  const updateQueued = useRef(false);

  useEffect(() => {
    if (updateQueued.current) {
      updateFormData({ verificationData });
      updateQueued.current = false;
    }
  }, [verificationData, updateFormData]);

  const handleInputChange = (field, value) => {
    setVerificationData((prev) => {
      const newData = { ...prev, [field]: value };
      updateQueued.current = true;
      return newData;
    });
  };

  const handleFileUpload = (file) => {
    setVerificationData((prev) => {
      const newData = { ...prev, companyDoc: file };
      updateQueued.current = true;
      return newData;
    });
  };

  const canProceed =
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
    verificationData.acceptTerms;

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="bg-background-card rounded-t-xl border-b border-[#E0E0E0]">
          <CardTitle className="text-lg font-medium text-[#6F6C6A]">
            Company & Office Info
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Company Name <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Company Identifier (EIN/TIN){" "}
                <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.companyEIN}
                onChange={(e) =>
                  handleInputChange("companyEIN", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter EIN/TIN"
              />
            </div>
          </div>

          {/* Company TIN and Document */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Company Identifier (TIN){" "}
                <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.companyTIN}
                onChange={(e) =>
                  handleInputChange("companyTIN", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter TIN"
              />
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Company Document <span className="rentyard-required">*</span>
              </Label>
              <FileUpload
                onFileSelect={handleFileUpload}
                acceptedTypes=".pdf"
                maxSize={10}
                currentFile={verificationData.companyDoc}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Country/Region <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="rentyard-input"
              />
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Street Address <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.streetAddress}
                onChange={(e) =>
                  handleInputChange("streetAddress", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter street address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Street Number <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.streetNumber}
                onChange={(e) =>
                  handleInputChange("streetNumber", e.target.value)
                }
                className="rentyard-input"
                placeholder="Enter street number"
              />
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Phone Number <span className="rentyard-required">*</span>
              </Label>
              <PhoneInput
                value={verificationData.phone}
                onChange={(value) => handleInputChange("phone", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Contact Email <span className="rentyard-required">*</span>
              </Label>
              <Input
                type="email"
                value={verificationData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="rentyard-input"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                City/Town <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="rentyard-input"
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                State/Territory <span className="rentyard-required">*</span>
              </Label>
              <Select
                value={verificationData.state}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-semibold text-text-primary mb-2 block">
                Zip Code <span className="rentyard-required">*</span>
              </Label>
              <Input
                value={verificationData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="rentyard-input"
                placeholder="Enter zip code"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="company-terms"
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
              htmlFor="company-terms"
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
