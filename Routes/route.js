const express = require("express");
const router = express.Router();

const {LocalfileUpload , imageUpload , videoUpload , uploadCompressedimage} = require("../Controllers/file");

router.post("/LocalfileUpload" , LocalfileUpload);
router.post("/imageUpload" , imageUpload);
router.post('/videoUpload' ,  videoUpload );
router.post('/uploadCompressedimage' ,  uploadCompressedimage)

module.exports = router;