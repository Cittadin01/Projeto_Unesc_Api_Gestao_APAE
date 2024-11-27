const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosControllers');

router.get('/', agendamentosController.listarAgendamentos);
router.get('/:id', agendamentosController.buscarAgendamentoPorId);
router.get('/:data', agendamentosController.buscarAgendamentoPorData);
router.post('/', agendamentosController.cadastrarAgendamento);
router.put('/:id', agendamentosController.atualizarAgendamento);
router.delete('/:id', agendamentosController.deletarAgendamento);

module.exports = router;