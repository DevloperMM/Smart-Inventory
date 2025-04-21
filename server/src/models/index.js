import Disposal from "./actions/disposal.model.js";
import AssetIssuance from "./actions/issueAsset.model.js";
import ConsumableIssuance from "./actions/issueConsumable.model.js";
import Request from "./actions/request.model.js";
import Requirement from "./actions/requirement.model.js";
import Asset from "./inventory/asset.model.js";
import Consumable from "./inventory/consumable.model.js";
import Discrepency from "./inventory/discrepency.model.js";
import Stock from "./inventory/stock.model.js";
import Tally from "./inventory/tally.model.js";
import User from "./user/user.model.js";

export const setupAssociations = async () => {
  Request.belongsTo(User, { foreignKey: "userId" });
  Request.belongsTo(User, { foreignKey: "approvedBy" });
  Request.hasOne(AssetIssuance, { foreignKey: "requestId" });
  Request.hasOne(ConsumableIssuance, { foreignKey: "requestId" });

  Requirement.belongsTo(User, { foreignKey: "raisedBy" });
  Requirement.belongsTo(User, { foreignKey: "approvedBy" });

  Asset.belongsTo(User, { foreignKey: "stockedBy" });
  Asset.hasOne(Disposal, { foreignKey: "assetId" });
  Asset.hasOne(AssetIssuance, { foreignKey: "assetId" });

  Consumable.belongsTo(User, { foreignKey: "stockedBy" });
  Consumable.hasOne(Disposal, { foreignKey: "consumableId" });
  Consumable.hasOne(ConsumableIssuance, { foreignKey: "consumableId" });

  Discrepency.belongsTo(Tally, { foreignKey: "tallyId" });

  Tally.belongsTo(User, { foreignKey: "checkedBy" });
  Tally.hasMany(Discrepency, { foreignKey: "tallyId" });

  Disposal.belongsTo(User, { foreignKey: "approvedBy" });
  Disposal.belongsTo(User, { foreignKey: "raisedBy" });
  Disposal.belongsTo(Asset, { foreignKey: "assetId" });
  Disposal.belongsTo(Consumable, { foreignKey: "consumableId" });

  AssetIssuance.belongsTo(Request, { foreignKey: "requestId" });
  AssetIssuance.belongsTo(Asset, { foreignKey: "assetId" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedBy" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedTo" });
  AssetIssuance.belongsTo(User, { foreignKey: "returnedTo" });

  ConsumableIssuance.belongsTo(Request, { foreignKey: "requestId" });
  ConsumableIssuance.belongsTo(Consumable, { foreignKey: "consumableId" });
  ConsumableIssuance.belongsTo(User, { foreignKey: "issuedBy" });
  ConsumableIssuance.belongsTo(User, { foreignKey: "issuedTo" });
  ConsumableIssuance.belongsTo(User, { foreignKey: "returnedTo" });

  User.hasMany(Request, { foreignKey: "userId" });
  User.hasMany(Request, { foreignKey: "approvedBy" });
  User.hasMany(Asset, { foreignKey: "stockedBy" });
  User.hasMany(Consumable, { foreignKey: "stockedBy" });
  User.hasMany(Tally, { foreignKey: "checkedBy" });
  User.hasMany(Disposal, { foreignKey: "raisedBy" });
  User.hasMany(Disposal, { foreignKey: "approvedBy" });
  User.hasMany(Requirement, { foreignKey: "raisedBy" });
  User.hasMany(Requirement, { foreignKey: "approvedBy" });
  User.hasMany(AssetIssuance, { foreignKey: "issuedBy" });
  User.hasMany(AssetIssuance, { foreignKey: "issuedTo" });
  User.hasMany(AssetIssuance, { foreignKey: "returnedTo" });
  User.hasMany(ConsumableIssuance, { foreignKey: "issuedBy" });
  User.hasMany(ConsumableIssuance, { foreignKey: "issuedTo" });
  User.hasMany(ConsumableIssuance, { foreignKey: "returnedTo" });
};

export {
  Discrepency,
  Disposal,
  Asset,
  AssetIssuance,
  Consumable,
  ConsumableIssuance,
  Request,
  Requirement,
  Stock,
  Tally,
  User,
};
