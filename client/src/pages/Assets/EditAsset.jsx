import { useEffect, useState } from "react";
import { Input, LoadIcon } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useAssetStore } from "../../store";

function EditAsset() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { asset, getAssetById, updateAsset, loading } = useAssetStore();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getAssetById(id);
  }, [id, getAssetById]);

  useEffect(() => {
    if (asset?.id) {
      setFormData({
        ...asset,
        startDate: format(parseISO(asset.startDate), "yyyy-MM-dd"),
        endDate: format(parseISO(asset.endDate), "yyyy-MM-dd"),
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      storeId: value === "HRD" ? 1 : 2,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAsset(id, formData);
    if (!res.success) return;
    setFormData(null);
    navigate("/admin/assets");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-7">
      <h2 className="text-2xl font-bold text-gray-800">Edit Asset details</h2>

      {formData && (
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
              label="Store"
              name="storeId"
              value={formData.storeId === 1 ? "HRD" : "CRD"}
              onChange={handleChange}
              required
              disabled
            />
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

            {loading ? (
              <LoadIcon />
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-2.5 rounded-xl hover:bg-green-700 transition cursor-pointer"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default EditAsset;
