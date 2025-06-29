"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import LogoImg from "../../../public/logo.png";

export default function Header({ currentStep = 1 }) {
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleExit = () => {
    if (
      window.confirm(
        "Are you sure you want to exit? Your progress will be lost."
      )
    ) {
      window.location.reload();
    }
  };

  const handleSaveExit = () => {
    // API Integration Point: Save current form data
    console.log("Save and exit functionality - API integration needed");
    alert("Progress saved! (Demo)");
  };

  return (
    <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image src={LogoImg} alt="RentYard" width={150} height={150} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {currentStep > 2 && (
              <Button
                variant="outline"
                onClick={handleSaveExit}
                className="hidden sm:flex items-center gap-2 px-6 py-3 border border-stock rounded-xl font-semibold text-text-primary hover:bg-gray-50"
              >
                Save & Exit
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleExit}
              className="px-6 py-3 border border-stock rounded-xl font-semibold text-text-primary hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep > 2 && (
          <div className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">
                Step {currentStep - 2} of 3
              </span>
              <span className="text-sm text-text-secondary">
                {Math.round(((currentStep - 2) / 3) * 100)}% Complete
              </span>
            </div>
            <Progress value={((currentStep - 2) / 3) * 100} className="h-2" />
          </div>
        )}
      </div>
    </header>
  );
}
