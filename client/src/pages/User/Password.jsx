import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { PassField } from "../../components";

const Password = () => {
  const [err, setErr] = useState();
  const [form, setForm] = useState({
    currPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => setErr("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setErr("");
    if (!(form.newPassword && form.currPassword && form.confirmPassword)) {
      setErr("All fields are required");
      return;
    } else if (form.newPassword !== form.confirmPassword) {
      setErr("New Password and Confirm Password must be same");
      return;
    }

    toast.success("Password changed");
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
          onClick={handleClick}
        />
        <PassField
          label="New Password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          onClick={handleClick}
        />
        <PassField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          onClick={handleClick}
        />

        {err && <p className="text-red-500 italic text-sm">{err}</p>}

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
