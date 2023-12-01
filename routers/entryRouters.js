const express = require("express")
const router = express.Router();
const { check } = require("express-validator");
const { validateInputs } = require("../middleware/validateInputs");
const { createEntry, getAllByUid, getById, deleteEntry, updateEntry } = require("../controllers/entryControllers")
const { uploadMiddleware } = require("../middleware/multer")

router.post("/",
    [
        check("uid", "The user ID is obligatory").not().isEmpty(),
        check("title", "The title is obligatory").not().isEmpty(),
        validateInputs,
    ],
    //uploadMiddleware.array("images"),
    createEntry)

router.get("/user/:uid", getAllByUid)

router.get("/id/:id", getById)

router.delete("/", deleteEntry)

router.put("/", updateEntry)

module.exports = router;