const multer = require('multer')
const express = require('express')
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
});
const fileUpload = upload.fields([
    {
        name: "file",
        maxCount: 1,
    },
]);

const ExcelController = require("../controllers/excel");
const excelController = new ExcelController();

router.post('/excel/upload/file',fileUpload, excelController.upload)
router.post('/excel/file/count', excelController.getCount)

module.exports = router;