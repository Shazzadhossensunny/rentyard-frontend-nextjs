"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPhoneNumber } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
];

export default function PhoneInput({ value = "", onChange, className = "" }) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState(value.replace(/^\+1\s?/, ""));

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    onChange(`${selectedCountry.code} ${formatted}`);
  };

  const handleCountryChange = (countryCode) => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
    onChange(`${countryCode} ${phoneNumber}`);
  };

  return (
    <div className="flex">
      <Select
        className="bg-[#E0E0E0]"
        value={selectedCountry.code}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className="w-24 h-12 rounded-r-none border-r-0 focus:z-10">
          <SelectValue>
            <span>{selectedCountry.flag}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#E0E0E0] relative z-50">
          {COUNTRY_CODES.map((country) => (
            <SelectItem
              key={`${country.code}-${country.country}`}
              value={country.code}
            >
              <div className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="(555) 123-4567"
        className="flex-1 !rounded-l-none focus:z-10 rentyard-input"
      />
    </div>
  );
}
