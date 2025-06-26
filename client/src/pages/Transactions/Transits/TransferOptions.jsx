import { useEffect, useState } from "react";
import { CustomSelect, LoadIcon } from "../../../components";
import { Trash, Plus } from "lucide-react";
import {
  useAssetStore,
  useConsumableStore,
  useTransferStore,
} from "../../../store";
import toast from "react-hot-toast";

const initialState = {
  assets: [],
  consumables: [],
};

function TransferOptions() {
  const [formData, setFormData] = useState(initialState);
  const { assets, getAssets } = useAssetStore();
  const { consumables, getConsumables } = useConsumableStore();
  const { loading } = useTransferStore();

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  useEffect(() => {
    getConsumables();
  }, [getConsumables]);

  const serialNoOptions = assets.map((asset) => ({
    label: asset.serialNo,
    value: asset.id,
    description: asset.description,
  }));

  const consumableOptions = consumables.map((c) => ({
    label: `${c.category} - ${c.specs}`,
    value: c.id,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.assets.includes("")) {
      toast.error("Empty record can't be submitted");
      return;
    }

    console.log("Final form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Transfer Options</h2>

      {/* Assets Section */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Assets</h3>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() =>
              setFormData((prev) => ({ ...prev, assets: [...prev.assets, ""] }))
            }
          >
            <Plus className="inline-block h-4 w-4 mb-0.5" /> Add
          </button>
        </div>

        {formData.assets.map((assetId, index) => {
          const selectedAsset = serialNoOptions.find(
            (opt) => opt.value === assetId
          );

          return (
            <div
              key={index}
              className="grid grid-cols-[3fr_9fr_auto] gap-4 items-start"
            >
              <CustomSelect
                name="serialNo"
                value={selectedAsset || null}
                onChange={(selected) => {
                  const updated = [...formData.assets];
                  updated[index] = selected?.value || "";
                  setFormData((prev) => ({ ...prev, assets: updated }));
                }}
                options={serialNoOptions}
                labelClass="text-black"
                required
              />
              <input
                value={
                  selectedAsset?.description ||
                  "Select to preview description..."
                }
                disabled
                className="w-full p-1.75 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = formData.assets.filter((_, i) => i !== index);
                  setFormData((prev) => ({ ...prev, assets: updated }));
                }}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <Trash size={20} strokeWidth={2.25} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Consumables Section */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Consumables</h3>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                consumables: [
                  ...prev.consumables,
                  { consumableId: "", isUsed: "", qty: "" },
                ],
              }))
            }
          >
            <Plus className="inline-block h-4 w-4 mb-0.5" /> Add
          </button>
        </div>

        {formData.consumables.map((consumable, index) => (
          <div
            key={index}
            className="grid grid-cols-[6fr_2fr_2fr_auto] gap-4 items-start"
          >
            {/* CustomSelect */}
            <div className="min-w-0">
              <CustomSelect
                name="consumableId"
                value={
                  consumableOptions.find(
                    (opt) => opt.value === consumable.consumableId
                  ) || null
                }
                onChange={(selected) => {
                  const updated = [...formData.consumables];
                  updated[index].consumableId = selected?.value || "";
                  setFormData((prev) => ({ ...prev, consumables: updated }));
                }}
                placeholder="Select consumable..."
                options={consumableOptions}
                labelClass="text-black"
                className="h-10 w-full"
                required
              />
            </div>

            {/* New / Used select */}
            <div className="min-w-0">
              <select
                className="h-10 w-full rounded-lg border border-gray-300 p-2 text-gray-800"
                value={
                  consumable.isUsed === ""
                    ? ""
                    : consumable.isUsed
                    ? "used"
                    : "new"
                }
                onChange={(e) => {
                  const updated = [...formData.consumables];
                  updated[index].isUsed = e.target.value === "used";
                  setFormData((prev) => ({ ...prev, consumables: updated }));
                }}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            {/* Qty input */}
            <div className="min-w-0">
              <input
                type="number"
                min={1}
                className="h-10 w-full rounded-lg border border-gray-300 p-2 text-gray-800"
                value={consumable.qty}
                placeholder="Qty"
                onChange={(e) => {
                  const updated = [...formData.consumables];
                  updated[index].qty = e.target.value;
                  setFormData((prev) => ({ ...prev, consumables: updated }));
                }}
                required
              />
            </div>

            {/* Trash icon */}
            <button
              type="button"
              onClick={() => {
                const updated = formData.consumables.filter(
                  (_, i) => i !== index
                );
                setFormData((prev) => ({ ...prev, consumables: updated }));
              }}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              <Trash size={20} strokeWidth={2.25} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-2 text-right">
        {loading ? (
          <LoadIcon />
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-2.5 rounded-xl hover:bg-green-700 transition cursor-pointer"
          >
            Submit Transfer
          </button>
        )}
      </div>
    </form>
  );
}

export default TransferOptions;
