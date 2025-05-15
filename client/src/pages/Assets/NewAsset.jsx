import { useState } from "react";
import { Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { isBefore } from "date-fns";

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
  const [err, setErr] = useState("");
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

    if (name === "startDate") {
      const isInvalid = !isBefore(new Date(value), new Date());
      setErr(
        isInvalid ? "Warranty start date can't be today or in future" : ""
      );
    }

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
    if (err) console.error("Something went wrong !!");

    setFormData({
      ...formData,
      description: "",
      category: "",
      mfgBy: "",
      modelNo: "",
      serialNo: "",
      startDate: "",
      endDate: "",
    });
    console.log(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-7">
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

      {err && <p className="text-red-500 italic text-sm block">{err}</p>}
    </div>
  );
}

export default NewAsset;
