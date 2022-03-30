const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  //console.log(req.body)
  Product.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "could not insert data",
      });
    });
};
exports.findAll = (req, res) => {
  //console.log('you are here')
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while loading the data",
      });
    });
};
exports.findOne = (req, res) => {
  //console.log(req.params.id)
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while loading the data id ${id}`,
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update product with id=${id}. Maybe product was not found or is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Produt with id=${id}`,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${id}. Product not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Porduct with id=${id}`,
      });
    });
};
