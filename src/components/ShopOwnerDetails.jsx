import React from "react";

const ShopOwnerDetails = ({ shopOwner, onBack, onEdit }) => {
  return (
    <div className="details-container">
      <div className="details-header">
        <div>
          <h2>👤 Shop Owner Details</h2>
          <p>Complete information about the shop owner</p>
        </div>
        <div className="details-actions">
          <button onClick={onEdit} className="btn btn-edit">
            ✏️ Edit
          </button>
          <button onClick={onBack} className="btn btn-secondary">
            ↩️ Back to List
          </button>
        </div>
      </div>

      <div className="details-content">
        <div className="details-card">
          <div className="detail-section">
            <h3>📋 Basic Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Owner ID:</label>
                <span className="detail-value">#{shopOwner.ownerId}</span>
              </div>
              <div className="detail-item">
                <label>Owner Name:</label>
                <span className="detail-value">{shopOwner.ownerName}</span>
              </div>
              <div className="detail-item">
                <label>Shop Name:</label>
                <span className="detail-value">{shopOwner.shopName}</span>
              </div>
              <div className="detail-item">
                <label>Shop Type:</label>
                <span className="detail-value shop-type">
                  {shopOwner.shopType}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>📍 Location Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>City:</label>
                <span className="detail-value">{shopOwner.city}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>📞 Contact Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Phone:</label>
                <span className="detail-value">{shopOwner.phone}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span className="detail-value email">{shopOwner.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDetails;
