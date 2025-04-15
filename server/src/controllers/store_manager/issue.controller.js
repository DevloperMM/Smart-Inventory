import asyncHandler from "../../utils/asyncHandler.js";

export const issueAsset = asyncHandler(async (req, res) => {});

export const getPendingAssetIssuances = asyncHandler(async (req, res) => {});

export const getApprovedAssetIssuances = asyncHandler(async (req, res) => {});

export const getRejectedAssetIssuances = asyncHandler(async (req, res) => {});

export const editAssetIssuancePreview = asyncHandler();

export const deleteAssetIssuancePreview = asyncHandler();

export const issueConsumable = asyncHandler(async (req, res) => {});

export const getPendingConsumableIssuances = asyncHandler(
  async (req, res) => {}
);

export const getApprovedConsumableIssuances = asyncHandler(
  async (req, res) => {}
);

export const getRejectedConsumableIssuances = asyncHandler(
  async (req, res) => {}
);

export const editConsumableIssuancePreview = asyncHandler();

export const deleteConsumableIssuancePreview = asyncHandler();
