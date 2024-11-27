const Aluno = require('../models/alunos.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos.' });
  }
};

// Buscar aluno por ID
exports.buscarAlunoPorId = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o aluno.' });
  }
};

// Buscar alunos por nome
exports.buscarAlunoPorNome = async (req, res) => {
  try {
    const nome = req.query.nome;
    const alunos = await Aluno.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${nome}%`,
        },
      },
    });
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos por nome.' });
  }
};

// Cadastrar um novo aluno
exports.cadastrarAluno = async (req, res) => {
  try {
    const { id, nome, idade, pais, telefone, necessidades_especiais, status } = req.body;
    const novoAluno = await Aluno.create({ id: uuidv4(), nome, idade, pais, telefone, necessidades_especiais, status });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
  }
};

// Atualizar um aluno
exports.atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, pais, telefone, necessidades_especiais, status } = req.body;

    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    aluno.nome = nome || aluno.nome;
    aluno.idade = idade || aluno.idade;
    aluno.pais = pais || aluno.pais;
    aluno.telefone = telefone || aluno.telefone;
    aluno.necessidades_especiais = necessidades_especiais || aluno.necessidades_especiais;
    aluno.status = status || aluno.status;

    await aluno.save();
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o aluno.' });
  }
};

// Excluir um aluno
exports.deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    await aluno.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o aluno.' });
  }
};