import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "../../../components";

const initialState = {
  category: "",
  mfgBy: "",
  asset: null,
  condition: "",
  reason: "",
};

const desccriptions = [
  "HP EliteBook 840 G8 Laptop - 16GB RAM, 512GB SSD",
  "Dell UltraSharp 27'' Monitor - U2723QE 4K USB-C",
  "Logitech MX Master 3S Wireless Mouse",
  "Lenovo ThinkPad Docking Station Gen 2",
  "Apple MacBook Pro 14'' - M2 Pro, 16GB RAM",
  "Epson EcoTank L3250 All-in-One Printer",
  "Microsoft Surface Laptop 5 - 13.5'' i5, 8GB RAM",
  "WD My Passport 1TB External Hard Drive",
  "Jabra Evolve2 65 Wireless Headset with Charging Stand",
  "Keychron K8 Wireless Mechanical Keyboard (Red Switch)",
];

function NewDispose() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const manufacturers = ["HP", "Dell"];
  const categories = [
    "BARCODE PRINTER",
    "BARCODE SCANNER",
    "DESKTOP",
    "LAPTOP",
    "PRINTER",
    "PROCESS LAPTOP",
    "PROCESS PC",
    "PROCESS SERVER",
    "SCANNER",
    "SERVER",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">Create Dispose</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/** First Column Inputs */}
        <div className="flex flex-col gap-4">
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
            label="Manufactured By"
            name="mfgBy"
            placeholder="Select or enter the manufacturer"
            value={formData.mfgBy}
            onChange={handleChange}
            required
            list={manufacturers}
          />
          <div className="flex gap-4">
            <Select
              label="Asset Description"
              name="asset"
              value={formData.asset}
              onChange={handleChange}
              required
              options={desccriptions}
              placeholder="Select asset"
            />
            <Input
              label="Serial Number"
              name="serialNo"
              value={formData.asset}
              onChange={handleChange}
              disabled
            />
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

export default NewDispose;
