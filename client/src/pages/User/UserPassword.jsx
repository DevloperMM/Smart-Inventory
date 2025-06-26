import { useState } from "react";
import { useUserStore } from "../../store";
import { Input } from "../../components";

const initialState = {
  currPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function UserPassword() {
  const [err, setErr] = useState("");
  const [form, setForm] = useState(initialState);

  const { changePass } = useUserStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

    changePass(form.currPassword, form.newPassword);
    setForm(initialState);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
        Change Password
      </h2>
      <div className="max-w-lg mx-auto bg-white/50 rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <Input
              label="Current Password"
              name="currPassword"
              value={form.currPassword}
              onChange={handleChange}
              required
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
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
    </>
  );
}

export default UserPassword;
