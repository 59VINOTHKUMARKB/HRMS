import { errorHandler } from "../middleware/error.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.user);
    if (!req.user || !req.user.role) {
      return next(errorHandler(401, "You must be logged in"));
    }

    // Extract role from user object
    const userRole = req.user.role;

    // Check if user's role is in the allowed roles array
    if (!allowedRoles.includes(userRole)) {
      return next(
        errorHandler(
          403,
          `Role ${userRole} is not authorized to perform this action`
        )
      );
    }

    next();
  };
};
