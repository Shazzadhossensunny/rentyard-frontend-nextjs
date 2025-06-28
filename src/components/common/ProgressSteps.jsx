"use client";

import { cn } from "@/lib/utils";

export default function ProgressSteps({ currentStep, totalSteps = 3 }) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10",
              index + 1 <= currentStep
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {index + 1}
          </div>
          <div
            className={cn(
              "h-1 w-full -mt-5",
              index < currentStep ? "bg-primary" : "bg-gray-200"
            )}
          />
        </div>
      ))}
    </div>
  );
}
