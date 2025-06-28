"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function PropertyManagementVerification({
  formData,
  updateFormData,
  nextStep,
}) {
  const [verificationData, setVerificationData] = useState(
    formData.verificationData || {
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
    }
  );

  const handleInputChange = (field, value) => {
    const newData = { ...verificationData, [field]: value };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
  };

  const handleFileUpload = (file) => {
    const newData = { ...verificationData, companyDoc: file };
    setVerificationData(newData);
    updateFormData({ verificationData: newData });
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
    <div className="max-w-3xl mx-auto">
      <Card className="rentyard-card">
        <CardHeader className="bg-background-card rounded-t-xl">
          <CardTitle className="text-xl font-semibold text-text-primary">
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
                <SelectContent>
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
              className="mt-1"
            />
            <Label
              htmlFor="company-terms"
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
