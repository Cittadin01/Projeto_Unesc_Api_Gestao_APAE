const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosControllers');

const getAlunos = (req, res) => {
   res.send('Lista de alunos');
};

router.get('/', alunosController.listarAlunos);
router.get('/:id', alunosController.buscarAlunoPorId);
router.get('/:nome', alunosController.buscarAlunoPorNome);
router.post('/', alunosController.cadastrarAluno);
router.put('/:id', alunosController.atualizarAluno);
router.delete('/:id', alunosController.deletarAluno);
router.get('/alunos', getAlunos);

module.exports = router;
