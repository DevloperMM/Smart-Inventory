import { format } from "date-fns";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import { useUserStore } from "../store/useUserStore.js";
import { useState } from "react";
import LoadIcon from "./LoadIcon.jsx";

function UserModal({ show, onClose, user, setUser, mode, setUserEmpty }) {
  if (!show) return null;

  const [password, setPassword] = useState("");

  const isView = mode === "view";
  const isNew = mode === "add";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "storeManaging") {
      setUser((prev) => ({
        ...prev,
        storeManaging: value === "HRD" ? 1 : 2,
      }));
    } else if (name === "password") {
      setPassword(value);
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "role" && value !== "store-manager"
          ? { storeManaging: 0 }
          : {}),
      }));
    }
  };

  const { updateUser, createUser, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    isNew
      ? await createUser({ ...user, password })
      : await updateUser(user.id, {
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          storeManaging: user.storeManaging,
          extension: user.extension,
          empCode: user.empCode,
          ...(password && { password }),
        });
    setUserEmpty();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl w-full relative"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            disabled={isView}
            onChange={handleChange}
            required={isNew}
          />
          <Input
            label="Extension"
            name="extension"
            value={user.ext}
            onChange={handleChange}
            disabled={isView}
          />
          <Input
            label="Employee Code"
            name="empCode"
            value={user.empCode}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Select
            label="Role"
            name="role"
            options={["admin", "it-head", "store-manager", "user"]}
            value={user.role}
            onChange={handleChange}
            disabled={isView}
            required
            placeholder="-- Select Role"
          />
          {user.role === "store-manager" && (
            <Select
              label="Store Managing"
              name="storeManaging"
              options={["HRD", "CRD"]}
              value={user.storeManaging === 1 ? "HRD" : "CRD"}
              onChange={handleChange}
              disabled={isView}
              required
            />
          )}
          <Input
            label="Department"
            name="department"
            value={user.department}
            onChange={handleChange}
            disabled={isView}
            required
          />
          {user.profileCreator && (
            <>
              <Input
                label="Profile Created By"
                name="profileCreatedBy"
                value={user.profileCreator?.name || ""}
                onChange={handleChange}
                disabled
              />
              <Input
                label="Profile Created On"
                name="profileCreatedOn"
                value={
                  user.profileCreatedOn
                    ? format(user.profileCreatedOn, "dd/MM/yyyy")
                    : ""
                }
                onChange={handleChange}
                disabled
              />
            </>
          )}
          {user.profileUpdator && (
            <>
              <Input
                label="Profile Updated By"
                name="profileUpdatedBy"
                value={user.profileUpdator?.name || ""}
                onChange={handleChange}
                disabled
              />
              <Input
                label="Profile Updated On"
                name="profileUpdatedOn"
                value={
                  user.profileUpdatedOn
                    ? format(user.profileUpdatedOn, "dd/MM/yyyy")
                    : ""
                }
                onChange={handleChange}
                disabled
              />
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {isView ? (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Close
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              {loading ? (
                <LoadIcon />
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Save
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserModal;
