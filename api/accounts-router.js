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

router.post("/", (req, res) => {
  const account = req.body;
  if (!account.name && !account.budget) {
    res
      .status(500)
      .json({ message: "Missing required Name and Budget fields." });
  } else {
    AccountsHelper.add(account)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  AccountsHelper.update(id, changes)
    .then(() => {
      AccountsHelper.getById(id).then((updatedAccount) => {
        res.status(201).json(updatedAccount);
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
