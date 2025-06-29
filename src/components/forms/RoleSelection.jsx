"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, KeySquare, Building } from "lucide-react";
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

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-left">
          Select Your Role
        </h2>
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
    </div>
  );
}
