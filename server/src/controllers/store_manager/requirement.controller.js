import asyncHandler from "../../utils/asyncHandler";

export const createRequirement = asyncHandler();

export const editRequirementPreview = asyncHandler();

export const deleteRequirementPreview = asyncHandler();

export const getAllPendingRequirements = asyncHandler(async (req, res) => {});

export const getAllApprovedRequirements = asyncHandler(async (req, res) => {});

export const getAllRejectedRequirements = asyncHandler(async (req, res) => {});
