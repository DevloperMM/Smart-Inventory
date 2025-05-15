import React, { useState } from "react";
import { Input } from "../../components";
import { useNavigate } from "react-router-dom";

const initialState = {
  category: "",
  specs: "",
  qty: "",
  isUsed: false,
  amcVendor: "",
};

function NewConsumable() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const categories = ["Mouse", "Keyboard", "Hard disk", "RAM", "Cartridge"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initialState);
    console.log(formData);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-7">
      <h1 className="text-2xl font-semibold italic text-gray-800">
        Enter new Consumables
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-md"
      >
        {/** First Column Inputs */}
        <div className="flex flex-col gap-5">
          <Input
            label="Category"
            name="category"
            placeholder="Select or enter the category"
            value={formData.category}
            onChange={handleChange}
            required
            list={categories}
          />
          <Input
            label="Specifications"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            required
            rowSpan={3}
          />
          <Input
            type="number"
            label="Quantity"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
          <Input
            label="AMC Vendor"
            name="amcVendor"
            value={formData.amcVendor}
            onChange={handleChange}
            required
          />
          <div className="flex flex-row gap-2 justify-between">
            <span className="text-sm text-gray-700">
              Whether the consumable is/are used
              <span className="text-red-500">*</span>
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isUsed"
                  value="true"
                  checked={formData.isUsed === "true"}
                  onChange={handleChange}
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isUsed"
                  value="false"
                  checked={formData.isUsed === "false"}
                  onChange={handleChange}
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-row justify-between mt-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-2.5 rounded-xl hover:bg-green-700 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewConsumable;
