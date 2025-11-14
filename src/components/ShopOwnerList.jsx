import React from "react";

const ShopOwnerList = ({ shopOwners, onEdit, onDelete, onView }) => {
  if (!shopOwners || shopOwners.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏪</div>
        <h3>No Shop Owners Found</h3>
        <p>Get started by adding your first shop owner to the system.</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>📋 Shop Owners List</h2>
        <span className="badge">{shopOwners.length} shop owner(s)</span>
      </div>

      <div className="table-wrapper">
        <table className="shop-owner-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner Name</th>
              <th>Shop Name</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Shop Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopOwners.map((owner) => (
              <tr key={owner.ownerId} className="table-row">
                <td className="id-cell">#{owner.ownerId}</td>
                <td className="name-cell">{owner.ownerName}</td>
                <td className="shop-cell">{owner.shopName}</td>
                <td className="city-cell">{owner.city}</td>
                <td className="phone-cell">{owner.phone}</td>
                <td className="email-cell">{owner.email}</td>
                <td className="type-cell">
                  <span className="shop-type-badge">{owner.shopType}</span>
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => onView(owner.ownerId)}
                      className="btn-action btn-view"
                      title="View Details"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => onEdit(owner)}
                      className="btn-action btn-edit"
                      title="Edit"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(owner.ownerId)}
                      className="btn-action btn-delete"
                      title="Delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopOwnerList;
