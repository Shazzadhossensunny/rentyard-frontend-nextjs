"use client";

import {
  AMENITIES,
  PET_TYPES,
  US_STATES,
  UTILITY_TYPES,
} from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pet Fees</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Pet type *</Label>
            <Select
              value={formData.petType}
              onValueChange={(value) => handleChange("petType", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select pet type" />
              </SelectTrigger>
              <SelectContent>
                {PET_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Max weight (LB) *</Label>
            <Input
              type="number"
              value={formData.maxWeight}
              onChange={(e) => handleChange("maxWeight", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Enter max weight"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>One time pet fee *</Label>
              <Input
                type="number"
                value={formData.oneTimeFee}
                onChange={(e) => handleChange("oneTimeFee", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="$0.00"
              />
            </div>

            <div>
              <Label>Pet security deposit *</Label>
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

          <div>
            <Label>Monthly pet rent *</Label>
            <Input
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => handleChange("monthlyRent", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="$0.00"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Pet Fee</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leasing Info</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Leasing info *</Label>
            <Input
              value={formData.leasingInfo}
              onChange={(e) => handleChange("leasingInfo", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Leasing office name"
            />
          </div>

          <div>
            <Label>Leasing manager phone number *</Label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
            />
          </div>

          <div>
            <Label>Leasing manager email *</Label>
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
            />
            <Label htmlFor="same-address">Address same as property</Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Leasing Info</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Parking Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Guest vehicle parking time *</Label>
            <Select
              value={formData.guestParkingTime}
              onValueChange={(value) => handleChange("guestParkingTime", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select time limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1H">1 Hour</SelectItem>
                <SelectItem value="2H">2 Hours</SelectItem>
                <SelectItem value="3H">3 Hours</SelectItem>
                <SelectItem value="4H">4 Hours</SelectItem>
                <SelectItem value="UNL">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Parking overview (max 200 characters)</Label>
            <Textarea
              value={formData.parkingOverview}
              onChange={(e) => handleChange("parkingOverview", e.target.value)}
              className="rentyard-input mt-1 min-h-[100px]"
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground text-right">
              {formData.parkingOverview.length}/200 characters
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Parking Info</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Charges</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Application fee (one-time) *</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={formData.applicationFee}
                onChange={(e) => handleChange("applicationFee", e.target.value)}
                className="rentyard-input mt-1"
                placeholder="0.00"
              />
              <span>per applicant</span>
            </div>
          </div>

          <div>
            <Label>Admin fee (one-time) *</Label>
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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Charges</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Educational Institution</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Educational institution type *</Label>
            <Select
              value={formData.institutionType}
              onValueChange={(value) => handleChange("institutionType", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary School</SelectItem>
                <SelectItem value="middle">Middle School</SelectItem>
                <SelectItem value="high">High School</SelectItem>
                <SelectItem value="college">College/University</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Distance from property *</Label>
            <Select
              value={formData.distance}
              onValueChange={(value) => handleChange("distance", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5 mile</SelectItem>
                <SelectItem value="1">1 mile</SelectItem>
                <SelectItem value="1.5">1.5 miles</SelectItem>
                <SelectItem value="2">2 miles</SelectItem>
                <SelectItem value="3">3 miles</SelectItem>
                <SelectItem value="5">5+ miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Educational institution name *</Label>
            <Input
              value={formData.institutionName}
              onChange={(e) => handleChange("institutionName", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Institution name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Institution</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rent Frequency & Payment Reminder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Rent payment frequency *</Label>
            <Select
              value={formData.paymentFrequency}
              onValueChange={(value) => handleChange("paymentFrequency", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rent reminder/statement date *</Label>
            <Input
              type="date"
              value={formData.reminderDate}
              onChange={(e) => handleChange("reminderDate", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>

          <div>
            <Label>Rent due date *</Label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="rentyard-input mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Rent Info</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nearest Station</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nearest station type *</Label>
            <Select
              value={formData.stationType}
              onValueChange={(value) => handleChange("stationType", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">Bus Station</SelectItem>
                <SelectItem value="train">Train Station</SelectItem>
                <SelectItem value="subway">Subway Station</SelectItem>
                <SelectItem value="tram">Tram Station</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Distance from property *</Label>
            <Select
              value={formData.distance}
              onValueChange={(value) => handleChange("distance", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5 mile</SelectItem>
                <SelectItem value="1">1 mile</SelectItem>
                <SelectItem value="1.5">1.5 miles</SelectItem>
                <SelectItem value="2">2 miles</SelectItem>
                <SelectItem value="3">3 miles</SelectItem>
                <SelectItem value="5">5+ miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Nearest station name *</Label>
            <Input
              value={formData.stationName}
              onChange={(e) => handleChange("stationName", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Station name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Station</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Application Agreement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Upload agreement *</Label>
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
              className="mt-1"
            />
            <Label
              htmlFor="immigrant"
              className="text-base font-semibold text-text-primary cursor-pointer"
            >
              Accept immigrant & international student application
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Agreement</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nearest Landmark</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Landmark type *</Label>
            <Input
              value={formData.landmarkType}
              onChange={(e) => handleChange("landmarkType", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Museum, Park, etc."
            />
          </div>

          <div>
            <Label>Distance from property *</Label>
            <Select
              value={formData.distance}
              onValueChange={(value) => handleChange("distance", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5 mile</SelectItem>
                <SelectItem value="1">1 mile</SelectItem>
                <SelectItem value="1.5">1.5 miles</SelectItem>
                <SelectItem value="2">2 miles</SelectItem>
                <SelectItem value="3">3 miles</SelectItem>
                <SelectItem value="5">5+ miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Landmark name *</Label>
            <Input
              value={formData.landmarkName}
              onChange={(e) => handleChange("landmarkName", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Landmark name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Landmark</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About the Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rentyard-input mt-1 min-h-[200px]"
            placeholder="Describe your property..."
          />
          <p className="text-sm text-muted-foreground text-right">
            {description.length}/500 characters
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Description</Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Utilities Provider</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Utility type *</Label>
            <Select
              value={formData.utilityType}
              onValueChange={(value) => handleChange("utilityType", value)}
            >
              <SelectTrigger className="rentyard-input">
                <SelectValue placeholder="Select utility type" />
              </SelectTrigger>
              <SelectContent>
                {UTILITY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Provider company name *</Label>
            <Input
              value={formData.providerName}
              onChange={(e) => handleChange("providerName", e.target.value)}
              className="rentyard-input mt-1"
              placeholder="Company name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Provider</Button>
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Community Amenities/Features</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rentyard-input pl-10"
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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Amenities</Button>
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
        videos: [],
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
    if (editIndex !== null) {
      const updatedItems = [...propertyInfo[type]];
      updatedItems[editIndex] = item;
      setPropertyInfo({ ...propertyInfo, [type]: updatedItems });
      setEditIndex(null);
    } else {
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

  const handleRemovePhoto = (index) => {
    const newPhotos = [...propertyInfo.propertyGallery.morePhotos];
    newPhotos.splice(index, 1);
    setPropertyInfo({
      ...propertyInfo,
      propertyGallery: {
        ...propertyInfo.propertyGallery,
        morePhotos: newPhotos,
      },
    });
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
          <div className="rentyard-card p-4 flex justify-between items-center">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDeleteItem("addresses", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "petFees":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
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
                className="text-destructive"
                onClick={() => handleDeleteItem("petFees", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "leasingInfo":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDeleteItem("leasingInfo", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "parking":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
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
                className="text-destructive"
                onClick={() => handleDeleteItem("parking", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "charges":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDeleteItem("charges", index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      case "educationalInstitutions":
        return (
          <div className="rentyard-card p-4 flex justify-between items-center">
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
                className="text-destructive"
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
          <div className="rentyard-card p-4 flex justify-between items-center">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDeleteItem("rentFrequency", index)}
              >
                <Trash2 className="w-4 h-4" />
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
                className="text-destructive"
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
                className="text-destructive"
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
                className="text-destructive"
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
                className="text-destructive"
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
      propertyInfo.addresses.length > 0 &&
      propertyInfo.leasingInfo.length > 0 &&
      propertyInfo.charges.length > 0 &&
      propertyInfo.propertyGallery.featuredPhoto
    );
  };

  const renderAmenities = () => {
    if (propertyInfo.amenities.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {propertyInfo.amenities.map((amenity, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
          >
            {amenity}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-text-primary mb-8">
        Condominiums Information
      </h2>

      {renderModal()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Row 1: Property Address & Pet Fees */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Property address{" "}
              <span className="text-destructive">(Required)</span>
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("addresses")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.addresses.map((address, index) =>
              renderItem(address, "addresses", index)
            )}
            {propertyInfo.addresses.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No property addresses added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pet fees (Optional)</h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("petFees")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.petFees.map((fee, index) =>
              renderItem(fee, "petFees", index)
            )}
            {propertyInfo.petFees.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No pet fees added
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Leasing Info & Parking */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Leasing info <span className="text-destructive">(Required)</span>
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("leasingInfo")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.leasingInfo.map((info, index) =>
              renderItem(info, "leasingInfo", index)
            )}
            {propertyInfo.leasingInfo.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No leasing info added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Parking (Optional)</h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("parking")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.parking.map((parking, index) =>
              renderItem(parking, "parking", index)
            )}
            {propertyInfo.parking.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No parking info added
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Charges & Educational Institutions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Charges <span className="text-destructive">(Required)</span>
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("charges")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.charges.map((charge, index) =>
              renderItem(charge, "charges", index)
            )}
            {propertyInfo.charges.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No charges added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.educationalInstitutions.map((institution, index) =>
              renderItem(institution, "educationalInstitutions", index)
            )}
            {propertyInfo.educationalInstitutions.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No institutions added
              </div>
            )}
          </div>
        </div>

        {/* Row 4: Rent Frequency & Nearest Stations */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Rent frequency & payment reminder{" "}
              <span className="text-destructive">(Required)</span>
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("rentFrequency")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="space-y-4">
            {propertyInfo.rentFrequency.map((freq, index) =>
              renderItem(freq, "rentFrequency", index)
            )}
            {propertyInfo.rentFrequency.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No rent info added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.nearestStations.map((station, index) =>
              renderItem(station, "nearestStations", index)
            )}
            {propertyInfo.nearestStations.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No stations added
              </div>
            )}
          </div>
        </div>

        {/* Row 5: Application Agreement & Nearest Landmarks */}
        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.applicationAgreement &&
              renderItem(
                propertyInfo.applicationAgreement,
                "applicationAgreement",
                0
              )}
            {!propertyInfo.applicationAgreement && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No agreement added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.nearestLandmarks.map((landmark, index) =>
              renderItem(landmark, "nearestLandmarks", index)
            )}
            {propertyInfo.nearestLandmarks.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No landmarks added
              </div>
            )}
          </div>
        </div>

        {/* Row 6: About Property & Utilities Providers */}
        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.aboutProperty ? (
              <div className="rentyard-card p-4">
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
                      className="text-destructive"
                      onClick={() =>
                        setPropertyInfo({ ...propertyInfo, aboutProperty: "" })
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No description added
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
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
          <div className="space-y-4">
            {propertyInfo.utilitiesProviders.map((provider, index) =>
              renderItem(provider, "utilitiesProviders", index)
            )}
            {propertyInfo.utilitiesProviders.length === 0 && (
              <div className="rentyard-card p-8 text-center text-gray-500">
                No providers added
              </div>
            )}
          </div>
        </div>

        {/* Row 7: Amenities */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Community’s amenity/features (Optional)
            </h3>
            <Button
              variant="link"
              onClick={() => setOpenModal("amenities")}
              className="text-primary font-semibold"
            >
              + Add
            </Button>
          </div>
          <div className="rentyard-card p-4">
            {propertyInfo.amenities.length > 0 ? (
              renderAmenities()
            ) : (
              <p className="text-gray-500 text-center py-4">
                No amenities selected
              </p>
            )}
          </div>
        </div>

        {/* Property Gallery */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Property Gallery</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Featured photos <span className="text-destructive">*</span>
              </Label>
              <FileUpload
                onFileSelect={(file) => handleFileUpload("featuredPhoto", file)}
                acceptedTypes=".jpg,.jpeg,.png"
                maxSize={5}
                currentFile={propertyInfo.propertyGallery.featuredPhoto}
              />
              <p className="text-sm text-muted-foreground mt-1">
                (jpg, png only)
              </p>
            </div>

            <div>
              <Label className="text-base font-semibold mb-2 block">
                More photos (optional)
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {propertyInfo.propertyGallery.morePhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      {photo instanceof File && (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Property ${index}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ))}
                {propertyInfo.propertyGallery.morePhotos.length < 8 && (
                  <div
                    className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("more-photos").click()
                    }
                  >
                    <span className="text-gray-500">+ Add</span>
                    <input
                      id="more-photos"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload("morePhotos", e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Label className="text-base font-semibold mb-2 block">
              Videos (optional)
            </Label>
            <Input
              type="text"
              placeholder="Enter video URL"
              className="rentyard-input"
            />
          </div>
        </div>
      </div>

      <Footer
        currentStep={currentStep}
        totalSteps={3}
        onBack={prevStep}
        onNext={nextStep}
        disabled={!requiredFieldsFilled()}
      />
    </div>
  );
}
