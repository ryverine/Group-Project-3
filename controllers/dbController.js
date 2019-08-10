const db = require("../models");

/*
db.User
  - find 1
db.Location
  - find all
db.Store
  - find 1
db.Product
  - find 1
db.StoreComment
  - find all
*/

// Defining methods for the booksController
module.exports = {
  findAllLocations: function(req, res) {
    db.Location
      .find(req.query)
      .populate("stores")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  loginUser: function(req, res) {
    var creds = req.params.credentials.split("+");
    db.User
      .findOne({'email': creds[0], 'password': creds[1]})
      .populate("storecomments")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findStoreById: function(req, res) {
    // https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
    var populateQuery = [{path:'products', select:'_id name brand'}, {path:'storecomments', select:'user comment updated'}];

    db.Store
      .findById(req.params.id)
      .populate(populateQuery)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findProductById: function(req, res) {
    db.Product
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findStoreCommentsByUser: function(req, res) {
    db.StoreComment
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createStoreComment: function(req, res) {
    db.StoreComment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateStoreComment: function(req, res) {
    db.StoreComment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeStoreComment: function(req, res) {
    db.StoreComment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
