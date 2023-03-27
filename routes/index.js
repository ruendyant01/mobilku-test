const express = require('express')
const Controller = require('../controllers')
const router = express.Router()
const upload = require("multer")();

router.post("/",upload.any(), Controller.createUser)
router.get("/", Controller.getAllUser)
router.get("/:id", Controller.getOneUser);
router.put("/:id", Controller.editUser);

module.exports = router