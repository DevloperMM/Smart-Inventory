import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, CustomSelect } from "../../../components";

const initialState = {
  category: "",
  mfgBy: "",
  asset: null,
  condition: "",
  reason: "",
};

const serialNos = [
  "CE283BAS3232",
  "BSE321HA2312",
  "AKJ723KJNA98",
  "LOISAH2382NJ",
  "MAJE38BAJ203",
  "IN9NJ2MKPIH4",
  "ZEIE89H32NL4",
  "AE239AN982W3",
  "O8Y823JALS31",
  "K0I2PJASE3B2",
];

const serialNoOptions = serialNos.map((sn) => ({
  label: sn,
  value: sn,
  description: `Asset for ${sn}`,
}));

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
      <h2 className="text-2xl font-bold text-gray-800">Create dispose</h2>

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
            <div className="w-1/3">
              <CustomSelect
                label="Serial Number"
                name="asset"
                value={
                  serialNoOptions.find((opt) => opt.value === formData.asset) ||
                  null
                }
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    asset: selected?.value || "",
                    serialNo: selected?.description || "",
                  }))
                }
                options={serialNoOptions}
                required
              />
            </div>

            <div className="w-2/3">
              <input
                name="serialNo"
                autoComplete="off"
                value={formData.serialNo || "Select to preview description..."}
                onChange={handleChange}
                disabled
                className={`w-full mt-8 rounded-lg px-3 py-1.5 border border-gray-300 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${"bg-gray-100 text-gray-700 border-gray-400 cursor-not-allowed"}`}
              />
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

export default NewDispose;
