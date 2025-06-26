import { format } from "date-fns";
import { Input } from "../../components";
import { useUserStore } from "../../store";

function UserProfile() {
  const { user } = useUserStore();

  return (
    <>
      <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
        My Profile
      </h2>
      <div className="max-w-3xl mx-auto bg-white/50 rounded-2xl shadow-md p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl">
          <div className="flex flex-col gap-6">
            <Input label="Name" value={user.name} disabled />
            <Input label="Email" value={user.email} disabled />
            <Input label="Emp Code" value={user.empCode} disabled />
            <Input label="Department" value={user.department} disabled />
            <Input
              label="Designation"
              value={user.role.toUpperCase()}
              disabled
            />
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
    </>
  );
}

export default UserProfile;
