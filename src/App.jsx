import React, { useState, useEffect } from "react";
import { shopOwnerAPI } from "./api";
import ShopOwnerList from "./components/ShopOwnerList";
import ShopOwnerForm from "./components/ShopOwnerForm";
import ShopOwnerDetails from "./components/ShopOwnerDetails";
import "./App.css";

const App = () => {
  const [shopOwners, setShopOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [viewingOwner, setViewingOwner] = useState(null);

  useEffect(() => {
    fetchShopOwners();
  }, []);

  const fetchShopOwners = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await shopOwnerAPI.getAllShopOwners();
      setShopOwners(data);
    } catch (err) {
      setError(
        "Failed to fetch shop owners. Make sure backend is running on port 8080."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShopOwner = async (shopOwnerData) => {
    try {
      await shopOwnerAPI.createShopOwner(shopOwnerData);
      setShowForm(false);
      fetchShopOwners(); // Refresh the list
      setError("");
    } catch (err) {
      setError("Failed to create shop owner");
    }
  };

  const handleUpdateShopOwner = async (shopOwnerData) => {
    try {
      await shopOwnerAPI.updateShopOwner(editingOwner.ownerId, shopOwnerData);
      setEditingOwner(null);
      setShowForm(false);
      fetchShopOwners(); // Refresh the list
      setError("");
    } catch (err) {
      setError("Failed to update shop owner");
    }
  };

  const handleDeleteShopOwner = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop owner?")) {
      try {
        await shopOwnerAPI.deleteShopOwner(id);
        fetchShopOwners(); // Refresh the list
        setError("");
      } catch (err) {
        setError("Failed to delete shop owner");
      }
    }
  };

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setShowForm(true);
    setViewingOwner(null);
  };

  const handleView = async (id) => {
    try {
      const owner = await shopOwnerAPI.getShopOwnerById(id);
      setViewingOwner(owner);
      setShowForm(false);
      setEditingOwner(null);
    } catch (err) {
      setError("Failed to fetch shop owner details");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOwner(null);
    setViewingOwner(null);
  };

  const handleAddNew = () => {
    setEditingOwner(null);
    setShowForm(true);
    setViewingOwner(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏪 Shop Owner Management System</h1>
        <p>Manage your shop owners efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <span>{error}</span>
            <button onClick={() => setError("")} className="close-error">
              ×
            </button>
          </div>
        )}

        {loading && <div className="loading">Loading shop owners...</div>}

        <div className="app-content">
          {showForm ? (
            <ShopOwnerForm
              shopOwner={editingOwner}
              onSubmit={
                editingOwner ? handleUpdateShopOwner : handleCreateShopOwner
              }
              onCancel={handleCancel}
              isEditing={!!editingOwner}
            />
          ) : viewingOwner ? (
            <ShopOwnerDetails
              shopOwner={viewingOwner}
              onBack={handleCancel}
              onEdit={() => handleEdit(viewingOwner)}
            />
          ) : (
            <>
              <div className="controls">
                <button onClick={handleAddNew} className="btn btn-primary">
                  ➕ Add New Shop Owner
                </button>
                <button onClick={fetchShopOwners} className="btn btn-secondary">
                  🔄 Refresh
                </button>
              </div>

              <ShopOwnerList
                shopOwners={shopOwners}
                onEdit={handleEdit}
                onDelete={handleDeleteShopOwner}
                onView={handleView}
              />
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Shop Owner Management System &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
