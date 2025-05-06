import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { PassField } from "../../components";

const Password = () => {
  const [form, setForm] = useState({
    currPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log(form);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PassField
          label="Current Password"
          name="currPassword"
          value={form.currPassword}
          onChange={handleChange}
          disabled={false}
        />
        <PassField
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          disabled={false}
        />
        <PassField
          label="Confirm New Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={false}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Update password
        </button>
      </form>
    </div>
  );
};

export default Password;
