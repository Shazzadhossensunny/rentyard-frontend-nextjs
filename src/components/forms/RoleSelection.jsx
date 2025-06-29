"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, KeySquare, Building, ChevronLeft } from "lucide-react";
import { USER_ROLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  KeySquare,
  User,
  Building,
};

export default function RoleSelection({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const [selectedRole, setSelectedRole] = useState(formData.userRole || "");

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    updateFormData({ userRole: roleId });
  };

  const handleGetStarted = () => {
    if (selectedRole) {
      nextStep();
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Select Your Role
        </h1>
      </div>

      {/* Role Selection */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USER_ROLES.map((role) => {
            const IconComponent = iconMap[role.icon];
            const isSelected = selectedRole === role.id;

            return (
              <Card
                key={role.id}
                className={cn(
                  "rentyard-card cursor-pointer transition-all duration-200 hover:shadow-lg",
                  isSelected && "selected border-primary bg-background-selected"
                )}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex items-center text-left gap-4">
                    <div className="p-4 rounded-full bg-[#F9FBFF] text-text-primary">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-text-primary">
                        {role.title}
                      </h3>
                      <p className="text-sm font-medium text-text-secondary">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={prevStep}
          className="flex items-center gap-2 text-text-primary font-semibold underline hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          onClick={handleGetStarted}
          disabled={!selectedRole}
          className={cn(
            "rentyard-button px-8 py-3 text-lg",
            !selectedRole && "opacity-50 cursor-not-allowed"
          )}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
