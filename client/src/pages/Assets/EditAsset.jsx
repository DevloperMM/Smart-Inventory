import { useState } from "react";
import { Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const assetInfo = {
  category: "Laptop",
  mfgBy: "Dell",
  modelNo: "Latitude 5520",
  description: "Business laptop with Intel Core i7, 16GB RAM, 512GB SSD",
  serialNo: "DL5520-SN00123",
  materialCode: "MAT-9981",
  pr: "PR-2025-0098",
  po: "PO-2025-3345",
  grn: "GRN-2025-1122",
  srr: "SRR-2025-7788",
  stockedOn: "2025-03-15T10:00:00Z",
  stockedBy: "Aman Kukreja",
  startDate: "2025-03-15T00:00:00Z",
  endDate: "2028-03-15T00:00:00Z",
  amcVendor: "TechCare Services Pvt Ltd",
  storeId: "HRD",
  addInfo: "Includes docking station and USB-C hub",
  status: "Available",
};

function EditAsset() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...assetInfo,
    startDate: format(assetInfo.startDate, "yyyy-MM-dd"),
    endDate: format(assetInfo.endDate, "yyyy-MM-dd"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "endDate" && {
        inWarranty: new Date() < new Date(value),
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">Edit Asset details</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md"
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
            disabled
          />
          <Input
            label="Manufactured By"
            name="mfgBy"
            placeholder="Select or enter the manufacturer"
            value={formData.mfgBy}
            onChange={handleChange}
            required
            disabled
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            label="Model Number"
            name="modelNo"
            value={formData.modelNo}
            onChange={handleChange}
            disabled
            required
          />
          <Input
            label="Serial Number"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            disabled
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
            label="Warranty End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
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
            disabled
          />
          <Input
            label="PO Number"
            name="po"
            value={formData.po}
            onChange={handleChange}
            disabled
            required
          />
          <Input
            label="GRN Number"
            name="grn"
            value={formData.grn}
            onChange={handleChange}
            disabled
          />
          <Input
            label="SRR Number"
            name="srr"
            value={formData.srr}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Material Code"
            name="materialCode"
            value={formData.materialCode}
            onChange={handleChange}
            disabled
          />
          <Input
            label="AMC Vendor"
            name="amcVendor"
            value={formData.amcVendor}
            onChange={handleChange}
          />
          <Input
            label="Additional Information"
            name="addInfo"
            value={formData.addInfo}
            onChange={handleChange}
          />
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

export default EditAsset;
