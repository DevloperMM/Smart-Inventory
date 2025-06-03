import { Input } from "../../components";
import { format } from "date-fns";
import { useUserStore } from "../../store/useUserStore.js";

function Profile() {
  const { user } = useUserStore();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col gap-6">
          <Input label="Name" value={user.name} disabled />
          <Input label="Email" value={user.email} disabled />
          <Input label="Emp Code" value={user.empCode} disabled />
          <Input label="Department" value={user.department} disabled />
          <Input label="Designation" value={user.role.toUpperCase()} disabled />
        </div>

        <div className="flex flex-col gap-6">
          {user.role.toLowerCase() === "store-manager" && (
            <Input
              label="Store Managing"
              value={user.storeManaging === 1 ? "HRD" : "CRD"}
              disabled
            />
          )}
          <Input
            label="Profile Created On"
            value={format(user.profileCreatedOn, "dd/MM/yyyy")}
            disabled
          />
          <Input
            label="Profile Created By"
            value={user.profileCreator.name}
            disabled
          />
          {user.profileUpdatedOn && (
            <Input
              label="Profile Updated On"
              value={format(user.profileUpdatedOn, "dd/MM/yyyy")}
              disabled
            />
          )}
          {user.profileUpdator && (
            <Input
              label="Profile Updated By"
              value={user.profileUpdator.name || ""}
              disabled
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
