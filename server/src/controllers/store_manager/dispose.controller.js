import asyncHandler from "../../utils/asyncHandler.js";

export const disposeAsset = asyncHandler(async (req, res) => {});

export const getPendingAssetDisposals = asyncHandler(async (req, res) => {});

export const getApprovedAssetDisposals = asyncHandler(async (req, res) => {});

export const getRejectedAssetDisposals = asyncHandler(async (req, res) => {});

export const editAssetDisposePreview = asyncHandler();

export const deleteAssetDisposePreview = asyncHandler();

export const disposeConsumable = asyncHandler(async (req, res) => {});

export const getPendingConsumableDisposals = asyncHandler(
  async (req, res) => {}
);

export const getApprovedConsumableDisposals = asyncHandler(
  async (req, res) => {}
);

export const getRejectedConsumableDisposals = asyncHandler(
  async (req, res) => {}
);

export const editConsumableDisposePreview = asyncHandler();

export const deleteConsumableDisposePreview = asyncHandler();
