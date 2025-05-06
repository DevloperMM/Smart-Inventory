import React from "react";
import { ProfileField } from "../../components";

function Profile() {
  const user = {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    empCode: "EMP1234",
    department: "IT",
    role: "User",
    storeManaging: 2,
    profileCreatedOn: "2025-03-01T10:30:00Z",
    profileCreatedBy: "IT CMS Department",
    profileUpdatedOn: "2025-04-10T16:45:00Z",
    profileUpdatedBy: "IT CMS Department",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileField label="Name" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Employee Code" value={user.empCode} />
        <ProfileField label="Department" value={user.department} />
        <ProfileField label="Role" value={user.role} />
        {user.role === "Store-Manager" && (
          <ProfileField
            label="Store Managing"
            value={user.storeManaging === 1 ? "HRD" : "CRD"}
          />
        )}
        <ProfileField
          label="Profile Created On"
          value={formatDate(user.profileCreatedOn)}
        />
        <ProfileField
          label="Profile Created By"
          value={user.profileCreatedBy}
        />
        <ProfileField
          label="Profile Updated On"
          value={formatDate(user.profileUpdatedOn)}
        />
        <ProfileField
          label="Profile Updated By"
          value={user.profileUpdatedBy}
        />
      </form>
    </div>
  );
}

export default Profile;
