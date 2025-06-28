"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/components/forms/verification/PropertyManagementVerification";

export default function PropertyAddressModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      propertyName: "",
      totalUnits: "",
      website: "",
      streetAddress: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
    }
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Property Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Property name as identifier *</Label>
            <Input
              value={formData.propertyName}
              onChange={(e) => handleChange("propertyName", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>

          <div>
            <Label>Total apartment unit *</Label>
            <Input
              type="number"
              value={formData.totalUnits}
              onChange={(e) => handleChange("totalUnits", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>

          <div>
            <Label>Property website (optional)</Label>
            <Input
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="https://"
            />
          </div>

          <div>
            <Label>Street address *</Label>
            <Input
              value={formData.streetAddress}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>

          <div>
            <Label>Apt, suite, unit (if applicable)</Label>
            <Input
              value={formData.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City/Town *</Label>
              <Input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="rentyard-input mt-1"
              />
            </div>

            <div>
              <Label>State/Territory *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleChange("state", value)}
              >
                <SelectTrigger className="rentyard-input mt-1">
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
          </div>

          <div>
            <Label>Zip code *</Label>
            <Input
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Property</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
