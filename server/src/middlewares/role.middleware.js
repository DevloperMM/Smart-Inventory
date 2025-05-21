import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAuthorised = (allowedRoles) => {
  return (req, _res, next) => {
    if (!allowedRoles.includes(req.user.role))
      throw new ApiError(403, "You do not have permission to view this page");

    next();
  };
};

const authorisedRoles = (...allowedRoles) => {
  return asyncHandler(isAuthorised(allowedRoles));
};

export default authorisedRoles;
