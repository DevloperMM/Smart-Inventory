import React from "react";
import { Input } from "../../components";

function Profile() {
  const user = {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    empCode: "97268",
    department: "IT & SAP",
    role: "store manager",
    storeManaging: 2,
    profileCreatedOn: "2025-03-01T10:30:00Z",
    profileCreatedBy: "Admin Helpdesk",
    profileUpdatedOn: "2025-04-10T16:45:00Z",
    profileUpdatedBy: "Admin Helpdesk",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold italic text-gray-800">
        My Profile
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col gap-4">
          <Input label="Name" value={user.name} disabled />
          <Input label="Email" value={user.email} disabled />
          <Input label="Emp Code" value={user.empCode} disabled />
          <Input label="Department" value={user.department} disabled />
          <Input label="Designation" value={user.role.toUpperCase()} disabled />
        </div>

        <div className="flex flex-col gap-4">
          {user.role.toLowerCase() === "store manager" && (
            <Input
              label="Store Managing"
              value={user.storeManaging === 1 ? "HRD" : "CRD"}
              disabled
            />
          )}
          <Input
            label="Profile Created On"
            value={formatDate(user.profileCreatedOn)}
            disabled
          />
          <Input
            label="Profile Created By"
            value={user.profileCreatedBy}
            disabled
          />
          <Input
            label="Profile Updated On"
            value={formatDate(user.profileUpdatedOn)}
            disabled
          />
          <Input
            label="Profile Updated By"
            value={user.profileUpdatedBy}
            disabled
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
