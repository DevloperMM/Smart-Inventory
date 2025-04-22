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
  Request.belongsTo(User, { foreignKey: "userId", as: "requester" });
  Request.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });
  Request.hasOne(AssetIssuance, { foreignKey: "requestId", as: "issuedAsset" });
  Request.hasOne(ConsumableIssuance, {
    foreignKey: "requestId",
    as: "issuedConsumable",
  });

  Requirement.belongsTo(User, { foreignKey: "raisedBy", as: "requester" });
  Requirement.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });

  Asset.belongsTo(User, { foreignKey: "stockedBy", as: "stocker" });
  Asset.hasOne(Disposal, { foreignKey: "assetId", as: "disposal" });
  Asset.hasOne(AssetIssuance, { foreignKey: "assetId", as: "assetIssuance" });

  Consumable.belongsTo(User, { foreignKey: "stockedBy", as: "stocker" });
  Consumable.hasOne(Disposal, { foreignKey: "consumableId", as: "disposal" });
  Consumable.hasOne(ConsumableIssuance, {
    foreignKey: "consumableId",
    as: "consumableIssuance",
  });

  Discrepency.belongsTo(Tally, { foreignKey: "tallyId", as: "tally" });

  Tally.belongsTo(User, { foreignKey: "checkedBy", as: "checker" });
  Tally.hasMany(Discrepency, { foreignKey: "tallyId", as: "discrepencies" });

  Disposal.belongsTo(User, { foreignKey: "raisedBy", as: "requester" });
  Disposal.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });
  Disposal.belongsTo(Asset, { foreignKey: "assetId", as: "asset" });
  Disposal.belongsTo(Consumable, {
    foreignKey: "consumableId",
    as: "consumable",
  });

  AssetIssuance.belongsTo(Request, { foreignKey: "requestId", as: "request" });
  AssetIssuance.belongsTo(Asset, { foreignKey: "assetId", as: "asset" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedBy", as: "issuer" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedTo", as: "receiver" });
  AssetIssuance.belongsTo(User, {
    foreignKey: "returnedTo",
    as: "returnReceiver",
  });

  ConsumableIssuance.belongsTo(Request, {
    foreignKey: "requestId",
    as: "request",
  });
  ConsumableIssuance.belongsTo(Consumable, {
    foreignKey: "consumableId",
    as: "consumable",
  });
  ConsumableIssuance.belongsTo(User, { foreignKey: "issuedBy", as: "issuer" });
  ConsumableIssuance.belongsTo(User, {
    foreignKey: "issuedTo",
    as: "receiver",
  });
  ConsumableIssuance.belongsTo(User, {
    foreignKey: "returnedTo",
    as: "returnReceiver",
  });

  User.belongsTo(User, { foreignKey: "profileCreatedBy", as: "creator" });
  User.belongsTo(User, { foreignKey: "profileUpdatedBy", as: "updater" });
  User.hasMany(Request, { foreignKey: "userId", as: "requests" });
  User.hasMany(Request, { foreignKey: "approvedBy", as: "approvedRequests" });
  User.hasMany(Asset, { foreignKey: "stockedBy", as: "assets" });
  User.hasMany(Consumable, { foreignKey: "stockedBy", as: "consumables" });
  User.hasMany(Tally, { foreignKey: "checkedBy", as: "checks" });
  User.hasMany(Disposal, { foreignKey: "raisedBy", as: "disposeRequests" });
  User.hasMany(Disposal, { foreignKey: "approvedBy", as: "approvedDisposals" });
  User.hasMany(Requirement, { foreignKey: "raisedBy", as: "requirements" });
  User.hasMany(Requirement, {
    foreignKey: "approvedBy",
    as: "approvedRequirements",
  });
  User.hasMany(AssetIssuance, { foreignKey: "issuedBy", as: "assetsIssued" });
  User.hasMany(AssetIssuance, { foreignKey: "issuedTo", as: "assetsReceived" });
  User.hasMany(AssetIssuance, {
    foreignKey: "returnedTo",
    as: "receivedAssetReturns",
  });
  User.hasMany(ConsumableIssuance, {
    foreignKey: "issuedBy",
    as: "consumablesIssued",
  });
  User.hasMany(ConsumableIssuance, {
    foreignKey: "issuedTo",
    as: "consumablesReceived",
  });
  User.hasMany(ConsumableIssuance, {
    foreignKey: "returnedTo",
    as: "receivedConsumableReturns",
  });
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
