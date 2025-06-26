import { useState } from "react";
import { CustomSelect } from "../../../components";
import {
  useAssetStore,
  useConsumableStore,
  useRequestStore,
} from "../../../store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NewUserRequest() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [endUser, setEndUser] = useState("");
  const [purpose, setPurpose] = useState("");
  const [storeId, setStoreId] = useState(0);

  const { assetCats } = useAssetStore();
  const { consumableCats } = useConsumableStore();
  const { createNewRequest } = useRequestStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !endUser || !purpose || !storeId) {
      toast.error("Fill all the required fields");
      return;
    }

    const res = await createNewRequest({ category, endUser, purpose, storeId });
    if (!res.success) return;

    setCategory("");
    setEndUser("");
    setPurpose("");
    setStoreId(0);

    navigate("/user/requests");
  };

  const cats = [...assetCats, ...consumableCats];
  const catOptions = cats.map((c) => ({ label: c, value: c }));
  const storeOptions = [
    { label: "HRD", value: 1 },
    { label: "CRD", value: 2 },
  ];

  return (
    <>
      <h2 className="text-3xl font-bold text-cyan-800 mb-8 text-center">
        Create New Request
      </h2>
      <div className="max-w-2xl mx-auto bg-white/50 rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomSelect
            label="Category"
            name="category"
            value={catOptions.find((opt) => opt.value === category) || null}
            onChange={(selected) => setCategory(selected.value)}
            options={catOptions}
            labelClass={"text-gray-700 font-medium"}
            required
          />

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              End User (Name)<span className="text-red-500">*</span>
            </label>
            <input
              value={endUser}
              onChange={(e) => setEndUser(e.target.value)}
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter the end user..."
              required
            />
          </div>

          <CustomSelect
            label="Store"
            name="storeId"
            value={storeOptions.find((opt) => opt.value === storeId) || null}
            onChange={(selected) => setStoreId(selected.value)}
            options={storeOptions}
            placeholder="Select Store"
            labelClass={"text-gray-700 font-medium"}
            required
          />

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Request Purpose<span className="text-red-500">*</span>
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Describe your purpose and enter equipment number if applicable..."
            ></textarea>
          </div>

          <div className="">
            <button
              type="submit"
              className="block mx-auto bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg transition-all"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewUserRequest;
