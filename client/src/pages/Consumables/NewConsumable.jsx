import { useState } from "react";
import { Input, Select } from "../../components";
import { useNavigate } from "react-router-dom";

const initialState = {
  category: "",
  specs: "",
  qty: "",
  isUsed: false,
  amcVendor: "",
  location: "",
};

const user = {
  role: "it-head",
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
    console.log({
      ...formData,
      location: location === "HRD" ? 1 : 2,
    });
    setFormData(initialState);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-7">
      <h2 className="text-2xl text-gray-800 font-bold">
        Enter consumable details
      </h2>

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
          {user.role === "it-head" && (
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              options={["HRD", "CRD"]}
              placeholder="Select Store"
              required
            />
          )}
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
                  required
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
                  required
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
