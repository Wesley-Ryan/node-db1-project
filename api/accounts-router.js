const express = require("express");
const router = express.Router();
const AccountsHelper = require("./accounts-model");

router.get("/", (req, res) => {
  AccountsHelper.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  AccountsHelper.getById(id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
