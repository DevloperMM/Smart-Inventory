import { useState } from "react";
import { Input, LoadIcon, Select } from "../../components";
import { useNavigate } from "react-router-dom";
import { useConsumableStore, useUserStore } from "../../store";

const initialState = {
  category: "",
  specs: "",
  qty: "",
  storeId: "",
};

function NewConsumable() {
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { consumableCats, createNewConsumable, loading } = useConsumableStore();

  const [formData, setFormData] = useState({
    ...initialState,
    storeId:
      user.storeManaging === 1 ? "HRD" : user.storeManaging === 2 ? "CRD" : "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createNewConsumable({
      ...formData,
      storeId: formData.storeId === "HRD" ? 1 : 2,
    });

    if (res.success) {
      setFormData(initialState);
      navigate("/admin/consumables");
    }
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
        <div className="flex flex-col gap-4">
          <Input
            label="Category"
            name="category"
            placeholder="Select or enter the category..."
            value={formData.category}
            onChange={handleChange}
            required
            list={consumableCats}
          />
          <Input
            label="Specifications"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            required
            rowSpan={3}
            placeholder="Please write specifications..."
          />
          <Input
            type="number"
            label="Quantity"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
            placeholder="Provide the quantity..."
          />
          <Select
            label="Store"
            name="storeId"
            value={formData.storeId}
            onChange={handleChange}
            options={["HRD", "CRD"]}
            placeholder="-- Select Store"
            disabled={user.storeManaging > 0}
            required
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
    </div>
  );
}

export default NewConsumable;
