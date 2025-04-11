import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authorisedRoles = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      if (req.user.role === "User")
        throw new ApiError(403, "You do not have permission to view this page");
      else throw new ApiError(403, "Please use assigned routes");
    }

    next();
  };
};

export default authorisedRoles;
