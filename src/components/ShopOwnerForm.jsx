import React, { useState, useEffect } from "react";

const ShopOwnerForm = ({ shopOwner, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    shopName: "",
    city: "",
    phone: "",
    email: "",
    shopType: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (shopOwner) {
      setFormData({
        ownerName: shopOwner.ownerName || "",
        shopName: shopOwner.shopName || "",
        city: shopOwner.city || "",
        phone: shopOwner.phone || "",
        email: shopOwner.email || "",
        shopType: shopOwner.shopType || "",
      });
    }
  }, [shopOwner]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.shopType.trim()) {
      newErrors.shopType = "Shop type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isEditing ? "✏️ Edit Shop Owner" : "➕ Add New Shop Owner"}</h2>
        <p>Please fill in all the required details below</p>
      </div>

      <form onSubmit={handleSubmit} className="shop-owner-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="ownerName" className="form-label">
              Owner Name *
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className={`form-input ${errors.ownerName ? "error" : ""}`}
              placeholder="Enter owner's full name"
            />
            {errors.ownerName && (
              <span className="error-text">{errors.ownerName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="shopName" className="form-label">
              Shop Name *
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className={`form-input ${errors.shopName ? "error" : ""}`}
              placeholder="Enter shop name"
            />
            {errors.shopName && (
              <span className="error-text">{errors.shopName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-input ${errors.city ? "error" : ""}`}
              placeholder="Enter city"
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="shopType" className="form-label">
              Shop Type *
            </label>
            <input
              type="text"
              id="shopType"
              name="shopType"
              value={formData.shopType}
              onChange={handleChange}
              className={`form-input ${errors.shopType ? "error" : ""}`}
              placeholder="e.g., Retail, Grocery, Electronics"
            />
            {errors.shopType && (
              <span className="error-text">{errors.shopType}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting
              ? "⏳ Processing..."
              : isEditing
              ? "💾 Update Shop Owner"
              : "➕ Create Shop Owner"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={submitting}
          >
            ↩️ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopOwnerForm;
