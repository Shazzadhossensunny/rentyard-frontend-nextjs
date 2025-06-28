"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ProgressSteps from "@/components/common/ProgressSteps";
import { cn } from "@/lib/utils";

export default function Footer({
  currentStep = 1,
  totalSteps = 3,
  onBack,
  onNext,
  disabled = false,
}) {
  return (
    <footer className="mt-12 border-t pt-6">
      <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-text-primary font-semibold hover:bg-gray-100 px-6 py-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          onClick={onNext}
          disabled={disabled}
          className={cn(
            "rentyard-button px-8 py-3",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {currentStep === totalSteps ? "Pay & Add Property" : "Next"}
        </Button>
      </div>
    </footer>
  );
}
