const Professor = require('../models/professores.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os professores
exports.listarProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professores.' });
  }
};

// Buscar professor por ID
exports.buscarProfessorPorId = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o professor.' });
  }
};

// Cadastrar um novo professor
exports.cadastrarProfessor = async (req, res) => {
  try {
    const { id, nome, disciplina, email, telefone, status } = req.body;
    const novoProfessor = await Professor.create({ id: uuidv4(), nome, disciplina, email, telefone, status });
    res.status(201).json(novoProfessor);
  } catch (error) {
    console.error('Erro ao cadastrar professor:', error); // Exibe o stack trace no console
    res.status(500).json({ error: 'Erro ao cadastrar professor.' });
  }  
};

// Atualizar um professor
exports.atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, disciplina, email, telefone, status } = req.body;

    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }

    professor.nome = nome || professor.nome;
    professor.disciplina = disciplina || professor.disciplina;
    professor.email = email || professor.email;
    professor.telefone = telefone || professor.telefone;
    professor.status = status || professor.status;

    await professor.save();
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o professor.' });
  }
};

// Excluir um professor
exports.deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }

    await professor.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o professor.' });
  }
};