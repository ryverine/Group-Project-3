const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// const dbController = require("../../controllers/dbController");

// Matches with "/api/books"
router.route("/product/:id").get(dbController.findProductById);

// Matches with "/api/books/:id"
/*router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);*/

module.exports = router;