const express = require("express")
const router = express.Router()
const enquetesController = require("../../controllers/enquetesController")

router.route("/")
    .get(enquetesController.getAllEnquetes)
    .post(enquetesController.createEnquete)
    .put(enquetesController.updateEnquete)
    .delete(enquetesController.deleteEnquete)

router.route("/:id")
    .get(enquetesController.getEnquete)

module.exports = router;