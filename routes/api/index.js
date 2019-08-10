const router = require("express").Router();
// const bookRoutes = require("./books");
const locationRoutes = require("./locations");
const storeRoutes = require("./store");
const productRoutes = require("./product");
const userRoutes = require("./user");
// const searchRoutes = require("./search");

// Book routes
//router.use("/", bookRoutes);

router.use("/", locationRoutes);

router.use("/", storeRoutes);

router.use("/", productRoutes);

router.use("/", userRoutes);

module.exports = router;
