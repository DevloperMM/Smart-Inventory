import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components";
import { useState } from "react";

const consumableInfo = {
  category: "USB Drive",
  specs: "SanDisk 32GB USB 3.0",
  qty: 50,
  updatedBy: "John Doe",
  updatedOn: "2025-05-10",
  location: 1,
  status: "New",
  amcVendor: "TechNova",
};

const user = {
  role: "it-head",
};

function EditConsumable() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...consumableInfo,
    updatedOn: format(consumableInfo.updatedOn, "yyyy-MM-dd"),
  });

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
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-7">
      <h2 className="text-2xl text-gray-800 font-bold">
        Edit consumable details
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
            disabled
          />
          <Input
            label="Specifications"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            rowSpan={3}
            required
          />
          <Input
            type="number"
            label="Quantity"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            disabled
          />
          <Input
            label="AMC Vendor"
            name="amcVendor"
            value={formData.amcVendor}
            onChange={handleChange}
          />
          {user.role === "it-head" && (
            <Input
              label="Location"
              name="location"
              value={formData.location === 1 ? "HRD" : "CRD"}
              onChange={handleChange}
              disabled
            />
          )}
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

export default EditConsumable;
