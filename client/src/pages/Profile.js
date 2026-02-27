import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    dob: "15-06-1985",
    occupation: "Software Engineer",
    income: "$120,000",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      alert("Profile Saved Successfully ✅");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>
        <button className="edit-btn" onClick={handleEditToggle}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      {/* User Card */}
      <div className="card user-card">
        <div className="avatar">
          {formData.fullName.charAt(0)}
        </div>

        <div>
          <h2>{formData.fullName}</h2>
          <div className="contact">
            <span>{formData.email}</span>
            <span>{formData.phone}</span>
            <span>{formData.city}, {formData.state}</span>
          </div>
          <div className="verified">✔ Verified Account</div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="card">
        <h3>Personal Information</h3>

        <div className="grid">
          <Field label="Full Name" name="fullName" value={formData.fullName} isEditing={isEditing} onChange={handleChange} />
          <Field label="Email Address" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} />
          <Field label="Phone Number" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} />
          <Field label="Date of Birth" name="dob" value={formData.dob} isEditing={isEditing} onChange={handleChange} />
          <Field label="Occupation" name="occupation" value={formData.occupation} isEditing={isEditing} onChange={handleChange} />
          <Field label="Annual Income" name="income" value={formData.income} isEditing={isEditing} onChange={handleChange} />
        </div>
      </div>

      {/* Address */}
      <div className="card">
        <h3>Address Information</h3>

        <div className="grid">
          <Field label="Street Address" name="address" value={formData.address} isEditing={isEditing} onChange={handleChange} full />
          <Field label="City" name="city" value={formData.city} isEditing={isEditing} onChange={handleChange} />
          <Field label="State" name="state" value={formData.state} isEditing={isEditing} onChange={handleChange} />
          <Field label="ZIP Code" name="zip" value={formData.zip} isEditing={isEditing} onChange={handleChange} />
        </div>
      </div>

    </div>
  );
};

const Field = ({ label, name, value, isEditing, onChange, full }) => (
  <div className={`field ${full ? "full" : ""}`}>
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      readOnly={!isEditing}
      onChange={onChange}
    />
  </div>
);

export default Profile;
// new update