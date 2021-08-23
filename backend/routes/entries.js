const express = require("express");
const router = express.Router();
const entries = require("../controllers/entryController");

router.route("/").get(entries.index);

module.exports = router;
