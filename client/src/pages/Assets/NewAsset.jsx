import React, { useState } from "react";
import { Input } from "../../components";
import { useNavigate } from "react-router-dom";

const initialState = {
  category: "",
  mfgBy: "",
  modelNo: "",
  description: "",
  serialNo: "",
  materialCode: "",
  pr: "",
  po: "",
  grn: "",
  srr: "",
  stockedOn: "",
  stockedBy: "",
  inWarranty: true,
  startDate: "",
  endDate: "",
  amcVendor: "",
  storeId: "",
  addInfo: "",
  status: "Available",
};

function NewAsset() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Asset:", formData);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold italic text-gray-800">
        Enter new Asset
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/** First Column Inputs */}
        <div className="flex flex-col gap-4">
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <Input
            label="Manufactured By"
            name="mfgBy"
            value={formData.mfgBy}
            onChange={handleChange}
            required
          />
          <Input
            label="Model Number"
            name="modelNo"
            value={formData.modelNo}
            onChange={handleChange}
            required
          />
          <Input
            label="Serial Number"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            required
          />
          <Input
            label="Warranty Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
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
        </div>

        {/** Second Column Inputs */}
        <div className="flex flex-col gap-4">
          <Input
            label="PR Number"
            name="pr"
            value={formData.pr}
            onChange={handleChange}
            required
          />
          <Input
            label="PO Number"
            name="po"
            value={formData.po}
            onChange={handleChange}
            required
          />
          <Input
            label="GRN Number"
            name="grn"
            value={formData.grn}
            onChange={handleChange}
            required
          />
          <Input
            label="SRR Number"
            name="srr"
            value={formData.srr}
            onChange={handleChange}
            required
          />
          <Input
            label="Material Code"
            name="materialCode"
            value={formData.materialCode}
            onChange={handleChange}
          />
          <Input
            label="Warranty End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <Input
            label="Additional Info"
            name="addInfo"
            value={formData.addInfo}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 flex flex-row justify-between mt-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            onClick={() => navigate("/assets")}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-2.5 rounded-xl hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAsset;
