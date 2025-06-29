"use client";
import React, { useState } from "react";

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState("regular");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardForm, setCardForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [savedCards, setSavedCards] = useState([]);
  const [errors, setErrors] = useState({});

  const plans = {
    regular: {
      name: "Regular",
      price: 99.99,
      features: ["Price for 1-50 unit", "Auto Pay"],
    },
    platinum: {
      name: "Platinum",
      price: 129.99,
      features: ["Price for 1-50 unit"],
    },
    enterprise: {
      name: "Enterprise",
      price: 199.99,
      features: ["Price for 1-50 unit"],
    },
  };

  const getTotalPrice = () => {
    const basePlan = plans[selectedPlan];
    const basePrice = basePlan ? basePlan.price : 0;

    if (billingCycle === "annually") {
      return basePrice * 12 * 0.43;
    }

    return basePrice;
  };

  const getCardType = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard";
    if (cleaned.startsWith("3")) return "amex";
    return "unknown";
  };

  const CardIcon = ({ type, className = "w-8 h-5" }) => {
    switch (type) {
      case "visa":
        return (
          <div
            className={`${className} bg-blue-600 rounded flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
        );
      case "mastercard":
        return (
          <div
            className={`${className} bg-red-500 rounded flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">MC</span>
          </div>
        );
      case "amex":
        return (
          <div
            className={`${className} bg-green-600 rounded flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">AMEX</span>
          </div>
        );
      default:
        return (
          <div
            className={`${className} bg-gray-400 rounded flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">CARD</span>
          </div>
        );
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardForm.name.trim()) {
      newErrors.name = "Name on card is required";
    }

    const cleanedCardNumber = cardForm.cardNumber.replace(/\s/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      newErrors.cardNumber = "Please enter a valid card number";
    } else if (!/^\d+$/.test(cleanedCardNumber)) {
      newErrors.cardNumber = "Card number must contain only numbers";
    }

    if (!cardForm.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
      newErrors.expiry = "Please enter expiry in MM/YY format";
    } else {
      const [month, year] = cardForm.expiry.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = "Invalid month";
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiry = "Card has expired";
      }
    }

    if (!cardForm.cvc) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(cardForm.cvc)) {
      newErrors.cvc = "CVC must be 3-4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCard = () => {
    if (!validateForm()) {
      return;
    }

    const newCard = {
      id: `card${Date.now()}`,
      name: cardForm.name,
      last4: cardForm.cardNumber.slice(-4),
      type: getCardType(cardForm.cardNumber),
    };

    setSavedCards([...savedCards, newCard]);
    setSelectedPayment(newCard.id);
    setShowAddCardModal(false);
    setCardForm({ name: "", cardNumber: "", expiry: "", cvc: "" });
    setErrors({});
  };

  const handlePayAndAddProperty = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 19) {
      setCardForm({ ...cardForm, cardNumber: formatted });
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: "" });
      }
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setCardForm({ ...cardForm, expiry: formatted });
    if (errors.expiry) {
      setErrors({ ...errors, expiry: "" });
    }
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCardForm({ ...cardForm, cvc: value });
      if (errors.cvc) {
        setErrors({ ...errors, cvc: "" });
      }
    }
  };

  const handleNameChange = (e) => {
    setCardForm({ ...cardForm, name: e.target.value });
    if (errors.name) {
      setErrors({ ...errors, name: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className=" mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Chose a plan for after 30-days free trial
        </h1>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === "annually"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Annually (save 57%)
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`relative bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                selectedPlan === key
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              {selectedPlan === key && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                {key === "regular" && (
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Auto Pay
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600">/mo</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment option
            </h3>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add new card
            </button>
          </div>

          {savedCards.length > 0 ? (
            <div className="space-y-4">
              {savedCards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedPayment(card.id)}
                  className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                    selectedPayment === card.id
                      ? "border-blue-600 bg-blue-50"
                      : index === 0 && !selectedPayment
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <CardIcon type={card.type} className="w-10 h-6" />
                    <span className="text-gray-900">{card.name}</span>
                    <span className="text-gray-600">
                      **** **** **** {card.last4}
                    </span>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedPayment === card.id ||
                      (index === 0 && !selectedPayment)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No payment methods added yet. Click "Add new card" to get started.
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-gray-600">Total with card charge: </span>
              <span className="text-xl font-bold text-gray-900">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            {(selectedPayment || savedCards.length > 0) && (
              <button
                onClick={handlePayAndAddProperty}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Pay & add property
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Add new card
              </h3>
              <button
                onClick={() => {
                  setShowAddCardModal(false);
                  setErrors({});
                  setCardForm({
                    name: "",
                    cardNumber: "",
                    expiry: "",
                    cvc: "",
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name on card *
                </label>
                <input
                  type="text"
                  value={cardForm.name}
                  onChange={handleNameChange}
                  placeholder="Alex Jones"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardForm.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    className={`w-full px-3 py-2 pr-12 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CardIcon type={getCardType(cardForm.cardNumber)} />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expire date *
                  </label>
                  <input
                    type="text"
                    value={cardForm.expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.expiry ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardForm.cvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className={`w-full px-3 py-2 pr-8 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cvc ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.cvc && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveCard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Your property has been added successfully.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.reload();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelection;
