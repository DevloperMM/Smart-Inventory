import { useState } from "react";
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
};

function NewAsset() {
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
      ...(name === "endDate" && {
        inWarranty: new Date() < new Date(value),
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initialState);
    console.log(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">Enter Asset details</h2>

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
            label="Warranty End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            name="description"
            rowSpan={2}
            value={formData.description}
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
          />
          <Input
            label="SRR Number"
            name="srr"
            value={formData.srr}
            onChange={handleChange}
          />
          <Input
            label="Material Code"
            name="materialCode"
            value={formData.materialCode}
            onChange={handleChange}
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
            rowSpan={2}
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

export default NewAsset;
