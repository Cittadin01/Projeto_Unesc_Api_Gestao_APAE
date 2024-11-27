const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosControllers');

router.get('/', eventosController.listarEventos);
router.get('/:id', eventosController.listarEventoPorId);
router.get('/:data', eventosController.listarEventosPorData)
router.post('/', eventosController.cadastrarEvento);
router.put('/:id', eventosController.atualizarEvento);
router.delete('/:id', eventosController.deletarEvento);

module.exports = router;