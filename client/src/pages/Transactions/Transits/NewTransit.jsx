import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "../../../components";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useUserStore } from "../../../store/useUserStore";

const initialState = {
  assets: [{ category: "", qty: "" }],
  consumables: [{ category: "", qty: "" }],
  description: "",
  fromStore: "",
};

function NewTransit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { user } = useUserStore();

  const assetOptions = ["PRINTER", "SCANNER", "DESKTOP", "LAPTOP", "SERVER"];
  const consumableOptions = ["MOUSE", "KEYBOARD", "CABLES", "HARD-DISK"];

  const handleAssetChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.assets];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, assets: updated }));
  };

  const handleConsumableChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.consumables];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, consumables: updated }));
  };

  const addAssetRow = () => {
    setFormData((prev) => ({
      ...prev,
      assets: [...prev.assets, { category: "", qty: "" }],
    }));
  };

  const removeAssetRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  };

  const addConsumableRow = () => {
    setFormData((prev) => ({
      ...prev,
      consumables: [...prev.consumables, { category: "", qty: "" }],
    }));
  };

  const removeConsumableRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      consumables: prev.consumables.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "fromStore") {
      if (value === "") parsedValue = 0;
      else if (value === "HRD") parsedValue = 1;
      else if (value === "CRD") parsedValue = 2;
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.assets.length <= 0 && formData.consumables.length <= 0)
      return toast.error("You can not make empty request");

    if (user.storeManaging > 0) {
      console.log({ ...formData, fromStore: user.storeManaging });
      return;
    }

    console.log(formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">Create New Transit</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {/* Assets Section */}
          <div className="md:w-1/2 md:pr-4 space-y-4 pb-6 md:pb-0">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Assets</h3>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={addAssetRow}
              >
                + Add
              </button>
            </div>

            {formData.assets.map((asset, index) => (
              <div key={index} className="grid grid-cols-[6fr_5fr_1fr] gap-4">
                <Select
                  name="category"
                  value={asset.category}
                  onChange={(e) => handleAssetChange(index, e)}
                  placeholder="Select category..."
                  options={assetOptions}
                  className="col-span-5"
                  required
                />
                <Input
                  type="number"
                  name="qty"
                  min={1}
                  value={asset.qty}
                  onChange={(e) => handleAssetChange(index, e)}
                  placeholder="Quantity..."
                  className="col-span-5"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeAssetRow(index)}
                  className="text-red-500  hover:text-red-700"
                >
                  <Trash size={20} strokeWidth={2.25} />
                </button>
              </div>
            ))}
          </div>

          {/* Consumables Section */}
          <div className="md:w-1/2 md:pl-4 space-y-4 pt-6 md:pt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Consumables
              </h3>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={addConsumableRow}
              >
                + Add
              </button>
            </div>

            {formData.consumables.map((consumable, index) => (
              <div key={index} className="grid grid-cols-[6fr_5fr_1fr] gap-4">
                <Select
                  name="category"
                  value={consumable.category}
                  onChange={(e) => handleConsumableChange(index, e)}
                  placeholder="Select category..."
                  options={consumableOptions}
                  required
                />
                <Input
                  type="number"
                  name="qty"
                  min={1}
                  value={consumable.qty}
                  onChange={(e) => handleConsumableChange(index, e)}
                  placeholder="Quantity..."
                  required
                />
                <button
                  type="button"
                  onClick={() => removeConsumableRow(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} strokeWidth={2.25} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {user.storeManaging === 0 && (
          <div className="grid grid-cols-2 gap-6 mt-8">
            <Select
              label="From Store"
              name="fromStore"
              value={
                formData.fromStore === 1
                  ? "HRD"
                  : formData.fromStore === 2
                  ? "CRD"
                  : ""
              }
              options={["HRD", "CRD"]}
              onChange={handleChange}
              placeholder="Transfer from..."
              required
            />

            <Input
              label="To Store"
              name="toStore"
              value={
                formData.fromStore === 1
                  ? "CRD"
                  : formData.fromStore === 2
                  ? "HRD"
                  : ""
              }
              onChange={handleChange}
              placeholder="Transfer to..."
              disabled
            />
          </div>
        )}

        <Input
          label="Description"
          name="description"
          rowSpan={2}
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter description..."
        />

        {/* Buttons */}
        <div className="flex justify-between mt-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2.5 rounded-xl hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTransit;
