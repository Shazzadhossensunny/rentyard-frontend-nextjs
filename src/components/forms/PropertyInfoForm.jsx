"use client";

import {
  AMENITIES,
  PET_TYPES,
  US_STATES,
  UTILITY_TYPES,
} from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PhoneInput from "../common/PhoneInput";
import { Checkbox } from "../ui/checkbox";
import FileUpload from "../common/FileUpload";
import { X, Trash2, Edit, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Footer from "../layout/Footer";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import PropertyGallery from "@/components/PropertyGallery";

// ==============================================
// MODAL COMPONENTS
// ==============================================

const PropertyAddressModal = ({ open, onClose, onSubmit, initialData }) => {
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        {/* Custom Header */}
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Property address
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          {/* Form Content */}
          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Property name as identifier{" "}
                  <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  value={formData.propertyName}
                  onChange={(e) => handleChange("propertyName", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="Enter property name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Total apartment units{" "}
                  <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => handleChange("totalUnits", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="Enter number of units"
                />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label className="text-sm font-medium">
                  Property website (optional)
                </Label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="https://"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label className="text-sm font-medium">
                  Street address <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  value={formData.streetAddress}
                  onChange={(e) =>
                    handleChange("streetAddress", e.target.value)
                  }
                  className="rentyard-input w-full"
                  placeholder="Enter street address"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Apt, suite, unit (if applicable)
                </Label>
                <Input
                  value={formData.unit}
                  onChange={(e) => handleChange("unit", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="Unit number"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Zip code <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  value={formData.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  City/Town <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="rentyard-input w-full"
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2 sm:col-span-1 lg:col-span-2">
                <Label className="text-sm font-medium">
                  State/Territory<sup className="rentyard-required">*</sup>
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleChange("state", value)}
                >
                  <SelectTrigger className="rentyard-input w-full">
                    <SelectValue placeholder="Choose state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#E0E0E0] relative z-50 max-h-60 overflow-y-auto">
                    {US_STATES.map((state) => (
                      <SelectItem
                        key={state}
                        value={state}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-[#E0E0E0]">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PetFeesModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      petType: "",
      maxWeight: "",
      oneTimeFee: "",
      securityDeposit: "",
      monthlyRent: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        {/* Custom Header */}
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Pet Fees
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Pet type <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.petType}
                onValueChange={(value) => handleChange("petType", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  {PET_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Max weight (LB) <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="number"
                value={formData.maxWeight}
                onChange={(e) => handleChange("maxWeight", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Enter max weight"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  One time pet fee <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  type="number"
                  value={formData.oneTimeFee}
                  onChange={(e) => handleChange("oneTimeFee", e.target.value)}
                  className="rentyard-input mt-1"
                  placeholder="$0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Pet security deposit{" "}
                  <sup className="rentyard-required">*</sup>
                </Label>
                <Input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) =>
                    handleChange("securityDeposit", e.target.value)
                  }
                  className="rentyard-input mt-1"
                  placeholder="$0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Monthly pet rent <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => handleChange("monthlyRent", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="$0.00"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Pet Fee</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const LeasingInfoModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      leasingInfo: "",
      phone: "",
      email: "",
      sameAsProperty: false,
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Leasing Info
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Leasing info <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.leasingInfo}
                onChange={(e) => handleChange("leasingInfo", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Leasing office name"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Leasing manager phone number{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Leasing manager email <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="email@example.com"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="same-address"
                checked={formData.sameAsProperty}
                onCheckedChange={(checked) =>
                  handleChange("sameAsProperty", checked)
                }
                className={cn(
                  "mt-1 h-4 w-4 rounded border border-[#D1D5DB]",
                  "data-[state=checked]:border-[#272B35] data-[state=checked]:bg-transparent",
                  "data-[state=checked]:text-[#272B35]",
                  "focus:ring-2 focus:ring-[#272B35] focus:ring-offset-2"
                )}
              />
              <Label htmlFor="same-address">Address same as property</Label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Leasing Info</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ParkingModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      guestParkingTime: "2H",
      parkingOverview: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Parking Information
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Guest vehicle parking time{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.guestParkingTime}
                onValueChange={(value) =>
                  handleChange("guestParkingTime", value)
                }
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select time limit" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="1H">1 Hour</SelectItem>
                  <SelectItem value="2H">2 Hours</SelectItem>
                  <SelectItem value="3H">3 Hours</SelectItem>
                  <SelectItem value="4H">4 Hours</SelectItem>
                  <SelectItem value="UNL">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Parking overview (max 200 characters)</Label>
              <Textarea
                value={formData.parkingOverview}
                onChange={(e) =>
                  handleChange("parkingOverview", e.target.value)
                }
                className="rentyard-input mt-1 min-h-[100px]"
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground text-right">
                {formData.parkingOverview.length}/200 characters
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Parking Info</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ChargesModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      applicationFee: "",
      adminFee: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">Charges</DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <Label>
                Application fee (one-time){" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={formData.applicationFee}
                  onChange={(e) =>
                    handleChange("applicationFee", e.target.value)
                  }
                  className="rentyard-input mt-1"
                  placeholder="0.00"
                />
                <span>per applicant</span>
              </div>
            </div>

            <div className="space-y-6">
              <Label>
                Admin fee (one-time) <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="number"
                value={formData.adminFee}
                onChange={(e) => handleChange("adminFee", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="0.00"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Type 0 if charges not applicable
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Charges</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EducationalInstitutionModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      institutionType: "",
      distance: "",
      institutionName: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Educational Institution
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Educational institution type{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.institutionType}
                onValueChange={(value) =>
                  handleChange("institutionType", value)
                }
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="elementary">Elementary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College/University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Distance from property{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.distance}
                onValueChange={(value) => handleChange("distance", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="0.5">0.5 mile</SelectItem>
                  <SelectItem value="1">1 mile</SelectItem>
                  <SelectItem value="1.5">1.5 miles</SelectItem>
                  <SelectItem value="2">2 miles</SelectItem>
                  <SelectItem value="3">3 miles</SelectItem>
                  <SelectItem value="5">5+ miles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Educational institution name{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.institutionName}
                onChange={(e) =>
                  handleChange("institutionName", e.target.value)
                }
                className="rentyard-input mt-1"
                placeholder="Institution name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Institution</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RentFrequencyModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      paymentFrequency: "monthly",
      reminderDate: "",
      dueDate: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Rent Frequency & Payment Reminder
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Rent payment frequency{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.paymentFrequency}
                onValueChange={(value) =>
                  handleChange("paymentFrequency", value)
                }
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Rent reminder/statement date{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="date"
                value={formData.reminderDate}
                onChange={(e) => handleChange("reminderDate", e.target.value)}
                className="rentyard-input mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Rent due date <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="rentyard-input mt-1"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Rent Info</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NearestStationModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      stationType: "",
      distance: "",
      stationName: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Nearest Station
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <Label>
                Nearest station type <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.stationType}
                onValueChange={(value) => handleChange("stationType", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="bus">Bus Station</SelectItem>
                  <SelectItem value="train">Train Station</SelectItem>
                  <SelectItem value="subway">Subway Station</SelectItem>
                  <SelectItem value="tram">Tram Station</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <Label>
                Distance from property{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.distance}
                onValueChange={(value) => handleChange("distance", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="0.5">0.5 mile</SelectItem>
                  <SelectItem value="1">1 mile</SelectItem>
                  <SelectItem value="1.5">1.5 miles</SelectItem>
                  <SelectItem value="2">2 miles</SelectItem>
                  <SelectItem value="3">3 miles</SelectItem>
                  <SelectItem value="5">5+ miles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <Label>
                Nearest station name <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.stationName}
                onChange={(e) => handleChange("stationName", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Station name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Station</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ApplicationAgreementModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      agreementFile: null,
      acceptImmigrant: false,
    }
  );

  const handleFileUpload = (file) => {
    setFormData({ ...formData, agreementFile: file });
  };

  const handleTermsChange = (checked) => {
    setFormData({ ...formData, acceptImmigrant: checked });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Application Agreement
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <Label>
                Upload agreement <sup className="rentyard-required">*</sup>
              </Label>
              <FileUpload
                onFileSelect={handleFileUpload}
                acceptedTypes=".pdf"
                maxSize={10}
                currentFile={formData.agreementFile}
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="immigrant"
                checked={formData.acceptImmigrant}
                onCheckedChange={handleTermsChange}
                className={cn(
                  "mt-1 h-4 w-4 rounded border border-[#D1D5DB]",
                  "data-[state=checked]:border-[#272B35] data-[state=checked]:bg-transparent",
                  "data-[state=checked]:text-[#272B35]",
                  "focus:ring-2 focus:ring-[#272B35] focus:ring-offset-2"
                )}
              />
              <Label
                htmlFor="immigrant"
                className="text-base font-semibold text-text-primary cursor-pointer"
              >
                Accept immigrant & international student application
              </Label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Agreement</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NearestLandmarkModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      landmarkType: "",
      distance: "",
      landmarkName: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Nearest Landmark
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <Label>
                Landmark type <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.landmarkType}
                onChange={(e) => handleChange("landmarkType", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Museum, Park, etc."
              />
            </div>

            <div className="space-y-6">
              <Label>
                Distance from property{" "}
                <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.distance}
                onValueChange={(value) => handleChange("distance", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  <SelectItem value="0.5">0.5 mile</SelectItem>
                  <SelectItem value="1">1 mile</SelectItem>
                  <SelectItem value="1.5">1.5 miles</SelectItem>
                  <SelectItem value="2">2 miles</SelectItem>
                  <SelectItem value="3">3 miles</SelectItem>
                  <SelectItem value="5">5+ miles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <Label>
                Landmark name <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.landmarkName}
                onChange={(e) => handleChange("landmarkName", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Landmark name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Landmark</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AboutPropertyModal = ({ open, onClose, onSubmit, initialData }) => {
  const [description, setDescription] = useState(initialData || "");

  const handleSubmit = () => {
    onSubmit(description);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              About the Property
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rentyard-input mt-1 min-h-[200px]"
              placeholder="Describe your property..."
            />
            <p className="text-sm text-muted-foreground text-right">
              {description.length}/500 characters
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save Description</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UtilitiesProviderModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      utilityType: "",
      providerName: "",
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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Utilities Provider
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <Label>
                Utility type <sup className="rentyard-required">*</sup>
              </Label>
              <Select
                value={formData.utilityType}
                onValueChange={(value) => handleChange("utilityType", value)}
              >
                <SelectTrigger className="rentyard-input">
                  <SelectValue placeholder="Select utility type" />
                </SelectTrigger>
                <SelectContent className="bg-[#E0E0E0] relative z-50">
                  {UTILITY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <Label>
                Provider company name <sup className="rentyard-required">*</sup>
              </Label>
              <Input
                value={formData.providerName}
                onChange={(e) => handleChange("providerName", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="Company name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Provider</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AmenitiesModal = ({ open, onClose, onSubmit, initialData }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(initialData || []);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedAmenities);
    onClose();
  };

  const filteredAmenities = AMENITIES.filter((amenity) =>
    amenity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-[14px] border border-[#E0E0E0] bg-white p-0">
        <div className="sticky top-0 w-full rounded-t-[14px] p-4 sm:p-6 border-b border-[#E0E0E0] bg-[#F4F4F4] z-10">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Community Amenities/Features
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="relative">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rentyard-input !pl-10"
                placeholder="Search amenities..."
              />
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
              {filteredAmenities.map((amenity) => (
                <div
                  key={amenity}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg border cursor-pointer",
                    selectedAmenities.includes(amenity)
                      ? "bg-primary/10 border-primary"
                      : "bg-white border-gray-200"
                  )}
                  onClick={() => toggleAmenity(amenity)}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center",
                      selectedAmenities.includes(amenity)
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                    )}
                  >
                    {selectedAmenities.includes(amenity) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Amenities</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==============================================
// MAIN PROPERTY INFO FORM COMPONENT
// ==============================================

export default function PropertyInfoForm({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const [propertyInfo, setPropertyInfo] = useState(
    formData.propertyInfo || {
      addresses: [],
      petFees: [],
      leasingInfo: [],
      parking: [],
      charges: [],
      educationalInstitutions: [],
      rentFrequency: [],
      nearestStations: [],
      applicationAgreement: null,
      nearestLandmarks: [],
      aboutProperty: "",
      utilitiesProviders: [],
      amenities: [],
      propertyGallery: {
        featuredPhoto: null,
        morePhotos: [],
        videos: {
          propertyVideo: null,
          virtualTour: null,
          aerialVideo: null,
        },
        videoUrl: "",
      },
    }
  );

  const [openModal, setOpenModal] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    updateFormData({ propertyInfo });
  }, [propertyInfo]);

  const handleAddItem = (type, item) => {
    // Ensure the property exists and is an array
    if (!propertyInfo[type] || !Array.isArray(propertyInfo[type])) {
      setPropertyInfo({
        ...propertyInfo,
        [type]: [item], // Initialize as new array with the item
      });
    } else if (editIndex !== null) {
      // Edit existing item
      const updatedItems = [...propertyInfo[type]];
      updatedItems[editIndex] = item;
      setPropertyInfo({ ...propertyInfo, [type]: updatedItems });
      setEditIndex(null);
    } else {
      // Add new item
      setPropertyInfo({
        ...propertyInfo,
        [type]: [...propertyInfo[type], item],
      });
    }
    setOpenModal(null);
  };

  const handleEditItem = (type, index) => {
    setEditIndex(index);
    setOpenModal(type);
  };

  const handleDeleteItem = (type, index) => {
    const updatedItems = [...propertyInfo[type]];
    updatedItems.splice(index, 1);
    setPropertyInfo({ ...propertyInfo, [type]: updatedItems });
  };

  const handleFileUpload = (field, file) => {
    if (field === "featuredPhoto") {
      setPropertyInfo({
        ...propertyInfo,
        propertyGallery: {
          ...propertyInfo.propertyGallery,
          featuredPhoto: file,
        },
      });
    } else if (field === "morePhotos") {
      setPropertyInfo({
        ...propertyInfo,
        propertyGallery: {
          ...propertyInfo.propertyGallery,
          morePhotos: [...propertyInfo.propertyGallery.morePhotos, file],
        },
      });
    }
  };

  // const handleRemovePhoto = (index) => {
  //   const newPhotos = [...propertyInfo.propertyGallery.morePhotos];
  //   newPhotos.splice(index, 1);
  //   setPropertyInfo({
  //     ...propertyInfo,
  //     propertyGallery: {
  //       ...propertyInfo.propertyGallery,
  //       morePhotos: newPhotos,
  //     },
  //   });
  // };
  const handleRemoveAmenity = (indexToRemove) => {
    const updatedAmenities = propertyInfo.amenities.filter(
      (_, index) => index !== indexToRemove
    );
    setPropertyInfo({ ...propertyInfo, amenities: updatedAmenities });
  };

  const renderModal = () => {
    switch (openModal) {
      case "addresses":
        return (
          <PropertyAddressModal
            open={openModal === "addresses"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("addresses", item)}
            initialData={
              editIndex !== null ? propertyInfo.addresses[editIndex] : null
            }
          />
        );
      case "petFees":
        return (
          <PetFeesModal
            open={openModal === "petFees"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("petFees", item)}
            initialData={
              editIndex !== null ? propertyInfo.petFees[editIndex] : null
            }
          />
        );
      case "leasingInfo":
        return (
          <LeasingInfoModal
            open={openModal === "leasingInfo"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("leasingInfo", item)}
            initialData={
              editIndex !== null ? propertyInfo.leasingInfo[editIndex] : null
            }
          />
        );
      case "parking":
        return (
          <ParkingModal
            open={openModal === "parking"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("parking", item)}
            initialData={
              editIndex !== null ? propertyInfo.parking[editIndex] : null
            }
          />
        );
      case "charges":
        return (
          <ChargesModal
            open={openModal === "charges"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("charges", item)}
            initialData={
              editIndex !== null ? propertyInfo.charges[editIndex] : null
            }
          />
        );
      case "educationalInstitutions":
        return (
          <EducationalInstitutionModal
            open={openModal === "educationalInstitutions"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("educationalInstitutions", item)}
            initialData={
              editIndex !== null
                ? propertyInfo.educationalInstitutions[editIndex]
                : null
            }
          />
        );
      case "rentFrequency":
        return (
          <RentFrequencyModal
            open={openModal === "rentFrequency"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("rentFrequency", item)}
            initialData={
              editIndex !== null ? propertyInfo.rentFrequency[editIndex] : null
            }
          />
        );
      case "nearestStations":
        return (
          <NearestStationModal
            open={openModal === "nearestStations"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("nearestStations", item)}
            initialData={
              editIndex !== null
                ? propertyInfo.nearestStations[editIndex]
                : null
            }
          />
        );
      case "applicationAgreement":
        return (
          <ApplicationAgreementModal
            open={openModal === "applicationAgreement"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("applicationAgreement", item)}
            initialData={
              editIndex !== null ? propertyInfo.applicationAgreement : null
            }
          />
        );
      case "nearestLandmarks":
        return (
          <NearestLandmarkModal
            open={openModal === "nearestLandmarks"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("nearestLandmarks", item)}
            initialData={
              editIndex !== null
                ? propertyInfo.nearestLandmarks[editIndex]
                : null
            }
          />
        );
      case "aboutProperty":
        return (
          <AboutPropertyModal
            open={openModal === "aboutProperty"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) =>
              setPropertyInfo({ ...propertyInfo, aboutProperty: item })
            }
            initialData={propertyInfo.aboutProperty}
          />
        );
      case "utilitiesProviders":
        return (
          <UtilitiesProviderModal
            open={openModal === "utilitiesProviders"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) => handleAddItem("utilitiesProviders", item)}
            initialData={
              editIndex !== null
                ? propertyInfo.utilitiesProviders[editIndex]
                : null
            }
          />
        );
      case "amenities":
        return (
          <AmenitiesModal
            open={openModal === "amenities"}
            onClose={() => setOpenModal(null)}
            onSubmit={(item) =>
              setPropertyInfo({ ...propertyInfo, amenities: item })
            }
            initialData={propertyInfo.amenities}
          />
        );
      default:
        return null;
    }
  };

  const renderItem = (item, type, index) => {
    switch (type) {
      case "addresses":
        return (
          <div
            key={`address-${item.id || index}`}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              {item.propertyName}, {item.streetAddress}, {item.city},{" "}
              {item.state} {item.zip}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("addresses", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "petFees":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              {item.petType}: Max {item.maxWeight}lb, Fee: ${item.oneTimeFee},
              Deposit: ${item.securityDeposit}, Rent: ${item.monthlyRent}/mo
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("petFees", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() => handleDeleteItem("petFees", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "leasingInfo":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              {item.leasingInfo}, Phone: {item.phone}, Email: {item.email}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("leasingInfo", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "parking":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              Guest Parking: {item.guestParkingTime},{" "}
              {item.parkingOverview.substring(0, 20)}...
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("parking", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() => handleDeleteItem("parking", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "charges":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              Application Fee: ${item.applicationFee}, Admin Fee: $
              {item.adminFee}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("charges", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "educationalInstitutions":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              {item.institutionType}: {item.institutionName}, {item.distance}{" "}
              miles
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("educationalInstitutions", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() =>
                  handleDeleteItem("educationalInstitutions", index)
                }
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "rentFrequency":
        return (
          <div
            key={index}
            className="rentyard-card p-4 flex justify-between items-center"
          >
            <div>
              Payment: {item.paymentFrequency}, Reminder: {item.reminderDate},
              Due: {item.dueDate}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("rentFrequency", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "nearestStations":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
            <div>
              {item.stationType}: {item.stationName}, {item.distance} miles
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("nearestStations", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() => handleDeleteItem("nearestStations", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "applicationAgreement":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
            <div>
              Agreement: {item.agreementFile?.name || "Uploaded"},
              {item.acceptImmigrant && " Accepts immigrants"}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("applicationAgreement", 0)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() =>
                  setPropertyInfo({
                    ...propertyInfo,
                    applicationAgreement: null,
                  })
                }
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "nearestLandmarks":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
            <div>
              {item.landmarkType}: {item.landmarkName}, {item.distance} miles
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("nearestLandmarks", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() => handleDeleteItem("nearestLandmarks", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "utilitiesProviders":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
            <div>
              {item.utilityType}: {item.providerName}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditItem("utilitiesProviders", index)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rentyard-required"
                onClick={() => handleDeleteItem("utilitiesProviders", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const requiredFieldsFilled = () => {
    return (
      propertyInfo.propertyGallery.featuredPhotos?.length > 0 &&
      propertyInfo.addresses?.length > 0 &&
      propertyInfo.leasingInfo?.length > 0 &&
      propertyInfo.charges?.length > 0
      // ❌ Do not include propertyVideos here
    );
  };

  const renderAmenities = () => {
    if (propertyInfo.amenities.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {propertyInfo.amenities.map((amenity, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-2 group hover:bg-gray-200 transition-colors"
          >
            {amenity}
            <button
              onClick={() => handleRemoveAmenity(index)}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label={`Remove ${amenity}`}
            >
              <X className="w-3 h-3 text-red-500" />
            </button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-text-primary mb-8">
        Condominiums Information
      </h2>

      {renderModal()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Row 1: Property Address & Pet Fees */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.addresses.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Property address{" "}
              <span className="rentyard-required">(Required)</span>
            </h3>
            {/* Only show Add button if no address exists */}
            {propertyInfo.addresses.length === 0 && (
              <Button
                variant="link"
                onClick={() => setOpenModal("addresses")}
                className="text-primary font-semibold underline"
              >
                + Add
              </Button>
            )}
          </div>

          {propertyInfo.addresses.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.addresses.map((address, index) =>
                renderItem(address, "addresses", index)
              )}
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.petFees.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">Pet fees (Optional)</h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("petFees")}
              className="text-primary underline font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.petFees.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.petFees.map((fee, index) =>
                renderItem(fee, "petFees", index)
              )}
            </div>
          )}
        </div>

        {/* Row 2: Leasing Info & Parking */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.leasingInfo.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Leasing info <span className="rentyard-required">(Required)</span>
            </h3>
            {/* Only show Add button if no address exists */}
            {propertyInfo.leasingInfo.length === 0 && (
              <Button
                variant="link"
                onClick={() => setOpenModal("leasingInfo")}
                className="text-primary font-semibold underline"
              >
                + Add
              </Button>
            )}
          </div>

          {propertyInfo.leasingInfo.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.leasingInfo.map((info, index) =>
                renderItem(info, "leasingInfo", index)
              )}
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.parking.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">Parking (Optional)</h3>

            <Button
              variant="link"
              onClick={() => setOpenModal("parking")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.parking.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.parking.map((parking, index) =>
                renderItem(parking, "parking", index)
              )}
            </div>
          )}
        </div>

        {/* Row 3: Charges & Educational Institutions */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.charges.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Charges <span className="rentyard-required">(Required)</span>
            </h3>
            {/* Only show Add button if no address exists */}
            {propertyInfo.charges.length === 0 && (
              <Button
                variant="link"
                onClick={() => setOpenModal("charges")}
                className="text-primary font-semibold underline"
              >
                + Add
              </Button>
            )}
          </div>

          {propertyInfo.charges.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.charges.map((charge, index) =>
                renderItem(charge, "charges", index)
              )}
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.educationalInstitutions.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Nearest educational institution (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("educationalInstitutions")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.educationalInstitutions.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.educationalInstitutions.map((institution, index) =>
                renderItem(institution, "educationalInstitutions", index)
              )}
            </div>
          )}
        </div>

        {/* Row 4: Rent Frequency & Nearest Stations */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.rentFrequency.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Rent frequency & payment reminder{" "}
              <span className="rentyard-required">(Required)</span>
            </h3>
            {/* Only show Add button if no address exists */}
            {propertyInfo.rentFrequency.length === 0 && (
              <Button
                variant="link"
                onClick={() => setOpenModal("rentFrequency")}
                className="text-primary font-semibold underline"
              >
                + Add
              </Button>
            )}
          </div>

          {propertyInfo.rentFrequency.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.rentFrequency.map((freq, index) =>
                renderItem(freq, "rentFrequency", index)
              )}
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.nearestStations.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Nearest stations (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("nearestStations")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.nearestStations.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.nearestStations.map((station, index) =>
                renderItem(station, "nearestStations", index)
              )}
            </div>
          )}
        </div>

        {/* Row 5: Application Agreement & Nearest Landmarks */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.applicationAgreement
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Application agreement (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("applicationAgreement")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.applicationAgreement && (
            <div className="space-y-4">
              {renderItem(
                propertyInfo.applicationAgreement,
                "applicationAgreement",
                0
              )}
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.nearestLandmarks.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Nearest landmark (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("nearestLandmarks")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.nearestLandmarks.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.nearestLandmarks.map((landmark, index) =>
                renderItem(landmark, "nearestLandmarks", index)
              )}
            </div>
          )}
        </div>

        {/* Row 6: About Property & Utilities Providers */}
        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.aboutProperty
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              About the property (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("aboutProperty")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.aboutProperty && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <p className="text-gray-700 line-clamp-3">
                  {propertyInfo.aboutProperty}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenModal("aboutProperty")}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rentyard-required"
                    onClick={() =>
                      setPropertyInfo({ ...propertyInfo, aboutProperty: "" })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.utilitiesProviders.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Utilities provider (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("utilitiesProviders")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.utilitiesProviders.length > 0 && (
            <div className="space-y-4">
              {propertyInfo.utilitiesProviders.map((provider, index) =>
                renderItem(provider, "utilitiesProviders", index)
              )}
            </div>
          )}
        </div>

        {/* Row 7: Amenities */}
        <div className="md:col-span-2 rentyard-card">
          <div
            className={`flex justify-between items-center ${
              propertyInfo.amenities.length > 0
                ? "mb-4 pb-4 border-b border-[#E0E0E0]"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold">
              Community's amenity/features (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("amenities")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>

          {propertyInfo.amenities.length > 0 ? renderAmenities() : null}
        </div>

        {/* Property Gallery */}
        <PropertyGallery
          propertyInfo={propertyInfo}
          setPropertyInfo={setPropertyInfo}
        />
      </div>

      <Footer
        currentStep={currentStep}
        totalSteps={2}
        onBack={prevStep}
        onNext={nextStep}
        disabled={!requiredFieldsFilled()}
      />
    </div>
  );
}
