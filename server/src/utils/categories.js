import { Asset, Consumable } from "../models/index.js";

export async function getAssetCategories(whereClause) {
  const records = await Asset.findAll({
    where: whereClause,
    attributes: ["category"],
    group: ["category"],
    raw: true,
  });

  if (!records || records.length <= 0) return [];

  const categories = records.map((record) => record.category);
  return categories;
}

export async function getConsumableCategories(whereClause) {
  const records = await Consumable.findAll({
    where: whereClause,
    attributes: ["category"],
    group: ["category"],
    raw: true,
  });

  if (!records || records.length <= 0) return [];

  const categories = records.map((record) => record.category);
  return categories;
}
