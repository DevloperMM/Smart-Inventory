import Asset from "./asset/asset.model.js";
import AssetIssuance from "./asset/issue.model.js";
import AssetDisposal from "./asset/dispose.model.js";
import Consumable from "./consumable/consumable.model.js";
import ConsumableIssuance from "./consumable/issue.model.js";
import ConsumableDisposal from "./consumable/dispose.model.js";
import Request from "./inventory/request.model.js";
import Transfer from "./inventory/transfer.model.js";
import Transit from "./inventory/transit.model.js";
import Stock from "./inventory/stock.model.js";
import User from "./user/user.model.js";

export const setupAssociations = async () => {
  Asset.belongsTo(User, { foreignKey: "stockedBy", as: "storeKeeper" });
  Asset.hasMany(AssetIssuance, { foreignKey: "assetId", as: "assetIssuances" });
  Asset.hasMany(AssetDisposal, { foreignKey: "assetId", as: "assetDisposal" });
  Asset.hasMany(ConsumableIssuance, {
    foreignKey: "toAssetId",
    as: "consumableIssuances",
  });

  AssetIssuance.belongsTo(Request, { foreignKey: "requestId", as: "request" });
  AssetIssuance.belongsTo(Asset, { foreignKey: "assetId", as: "asset" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedBy", as: "issuer" });
  AssetIssuance.belongsTo(User, { foreignKey: "issuedTo", as: "recipient" });
  AssetIssuance.belongsTo(User, { foreignKey: "handledBy", as: "handler" });

  AssetDisposal.belongsTo(Asset, { foreignKey: "assetId", as: "asset" });
  AssetDisposal.belongsTo(User, { foreignKey: "raisedBy", as: "requester" });
  AssetDisposal.belongsTo(User, { foreignKey: "decidedBy", as: "decider" });
  AssetDisposal.belongsTo(User, { foreignKey: "soldBy", as: "seller" });

  Consumable.belongsTo(User, { foreignKey: "updatedBy", as: "storeUpdater" });
  Consumable.hasMany(ConsumableIssuance, {
    foreignKey: "consumableId",
    as: "consumableIssuances",
  });

  ConsumableIssuance.belongsTo(User, { foreignKey: "issuedBy", as: "issuer" });
  ConsumableIssuance.belongsTo(Request, {
    foreignKey: "requestId",
    as: "request",
  });
  ConsumableIssuance.belongsTo(Asset, {
    foreignKey: "toAssetId",
    as: "asset",
  });
  ConsumableIssuance.belongsTo(Consumable, {
    foreignKey: "consumableId",
    as: "consumable",
  });
  ConsumableIssuance.belongsTo(User, {
    foreignKey: "issuedTo",
    as: "recipient",
  });
  ConsumableIssuance.belongsTo(User, {
    foreignKey: "handledBy",
    as: "handler",
  });

  ConsumableDisposal.belongsTo(Consumable, {
    foreignKey: "consumableId",
    as: "consumable",
  });
  ConsumableDisposal.belongsTo(User, { foreignKey: "soldBy", as: "seller" });
  ConsumableDisposal.belongsTo(User, {
    foreignKey: "raisedBy",
    as: "requester",
  });
  ConsumableDisposal.belongsTo(User, {
    foreignKey: "decidedBy",
    as: "decider",
  });

  Request.belongsTo(User, { foreignKey: "requestedBy", as: "requester" });
  Request.belongsTo(User, { foreignKey: "decidedBy", as: "decider" });

  Transfer.belongsTo(Transit, { foreignKey: "transitId", as: "transit" });
  Transfer.belongsTo(User, { foreignKey: "transferredBy", as: "sender" });
  Transfer.belongsTo(User, { foreignKey: "receivedBy", as: "receiver" });

  Transit.hasOne(Transfer, { foreignKey: "transitId", as: "transfer" });
  Transit.belongsTo(User, { foreignKey: "requestedBy", as: "requester" });
  Transit.belongsTo(User, { foreignKey: "decidedBy", as: "decider" });

  User.hasMany(Request, { foreignKey: "requestedBy", as: "requests" });
  User.hasMany(AssetIssuance, { foreignKey: "issuedTo", as: "assetsReceived" });
  User.hasMany(ConsumableIssuance, {
    foreignKey: "issuedTo",
    as: "consumablesReceived",
  });
  User.belongsTo(User, {
    foreignKey: "profileCreatedBy",
    as: "profileCreator",
  });
  User.belongsTo(User, {
    foreignKey: "profileUpdatedBy",
    as: "profileUpdator",
  });
};

export {
  Asset,
  AssetDisposal,
  AssetIssuance,
  Consumable,
  ConsumableDisposal,
  ConsumableIssuance,
  Stock,
  Transfer,
  Transit,
  Request,
  User,
};
