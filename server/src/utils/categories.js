import { Asset, Consumable } from "../models/index.js";

export async function getAssetCategories() {
  const records = await Asset.findAll({
    attributes: ["category"],
    group: ["category"],
    raw: true,
  });

  if (!records || records.length <= 0) return [];

  const categories = records.map((record) => record.category);
  return categories;
}

export async function getConsumableCategories() {
  const records = await Consumable.findAll({
    attributes: ["category"],
    group: ["category"],
    raw: true,
  });

  if (!records || records.length <= 0) return [];

  const categories = records.map((record) => record.category);
  return categories;
}
