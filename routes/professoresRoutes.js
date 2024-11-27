const express = require('express');
const router = express.Router();
const professoresController = require('../controllers/professoresControllers');

router.get('/', professoresController.listarProfessores);
router.get('/:id', professoresController.buscarProfessorPorId);
router.post('/', professoresController.cadastrarProfessor);
router.put('/:id', professoresController.atualizarProfessor);
router.delete('/:id', professoresController.deletarProfessor);

module.exports = router;