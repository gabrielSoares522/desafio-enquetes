const express = require("express")
const router = express.Router()
const opcoesController = require("../../controllers/opcoesController")

router.route("/")
    .get(opcoesController.getAllOpcoes)
    .post(opcoesController.createOpcao)
    .put(opcoesController.updateOpcao)
    .delete(opcoesController.deleteOpcao)

router.route("/:id")
    .get(opcoesController.getOpcao)

module.exports = router;