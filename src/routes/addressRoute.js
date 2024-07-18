const express = require("express");
const { addAddress } = require("../controllers/addressController");
const router = express.Router();

router.get('/addAddress',addAddress);
module.exports = router;