const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers');

router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.buscarUsuarioPorId);
router.get('/:nome', usuariosController.buscarUsuarioPorNome);
router.post('/', usuariosController.cadastrarUsuario);
router.put('/:id', usuariosController.atualizarUsuario);
router.delete('/:id', usuariosController.deletarUsuario);

module.exports = router;