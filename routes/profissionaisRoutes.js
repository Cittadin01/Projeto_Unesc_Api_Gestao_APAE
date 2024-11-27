const express = require('express');
const router = express.Router();
const profissionaisController = require('../controllers/profissionaisControllers');

router.get('/', profissionaisController.listarProfissionais);
router.get('/:id', profissionaisController.buscarProfissionalPorId);
router.get('/:nome', profissionaisController.buscarProfissionalPorNome);
router.post('/', profissionaisController.cadastrarProfissional);
router.put('/:id', profissionaisController.atualizarProfissional);
router.delete('/:id', profissionaisController.deletarProfissional);

module.exports = router;