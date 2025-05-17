import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "../../components";

const Password = () => {
  const [err, setErr] = useState("");
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
    <div className="p-6 w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex flex-col gap-6">
          <Input
            label="Current Password"
            name="currPassword"
            value={form.currPassword}
            onChange={handleChange}
            onClick={handleClick}
            required
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            onClick={handleClick}
            required
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            onClick={handleClick}
            required
          />

          {err && <p className="text-red-500 italic text-sm">{err}</p>}

          <button
            type="submit"
            className="w-fit block mx-auto mt-4 px-4 bg-emerald-500 text-white py-2 rounded-lg cursor-pointer hover:bg-green-500 transition"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
