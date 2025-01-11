export const checkAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(200).json({
        success: true,
        message: "Access Denied! Admin rights required",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
