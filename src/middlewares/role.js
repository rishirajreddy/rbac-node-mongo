const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access Denied: You do not have permission" });
    }
    next();
  };
};

module.exports = roleMiddleware;
