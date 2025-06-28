"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Building2 } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  Home,
  Building,
  Building2,
};

export default function PropertyTypeSelection({
  formData,
  updateFormData,
  nextStep,
}) {
  const [selectedType, setSelectedType] = useState(formData.propertyType || "");

  const handleTypeSelect = (typeId) => {
    // Only allow selection of Condominiums
    if (typeId === "condominiums") {
      setSelectedType(typeId);
      updateFormData({ propertyType: typeId });
    }
  };

  const handleGetStarted = () => {
    if (selectedType === "condominiums") {
      nextStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Welcome to RentYard
        </h1>
        <p className="text-lg text-text-secondary">
          Select your property type to get started
        </p>
      </div>

      {/* Property Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
          Property Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTY_TYPES.map((type) => {
            const IconComponent = iconMap[type.icon];
            const isSelected = selectedType === type.id;
            const isDisabled = type.disabled;

            return (
              <Card
                key={type.id}
                className={cn(
                  "rentyard-card cursor-pointer transition-all duration-200",
                  isSelected &&
                    "selected border-primary bg-background-selected",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !isDisabled && handleTypeSelect(type.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={cn(
                        "p-4 rounded-full",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {type.title}
                    </h3>
                    {isDisabled && (
                      <p className="text-sm text-text-secondary">Coming Soon</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Get Started Button */}
      <div className="text-center">
        <Button
          onClick={handleGetStarted}
          disabled={selectedType !== "condominiums"}
          className={cn(
            "rentyard-button px-8 py-3 text-lg",
            selectedType !== "condominiums" && "opacity-50 cursor-not-allowed"
          )}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
