const ProfissionalSaude = require('../models/profissionais.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os profissionais de saúde
exports.listarProfissionais = async (req, res) => {
  try {
    const profissionais = await ProfissionalSaude.findAll();
    res.status(200).json(profissionais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar profissionais de saúde.' });
  }
};

// Buscar profissional de saúde por ID
exports.buscarProfissionalPorId = async (req, res) => {
  try {
    const profissional = await ProfissionalSaude.findByPk(req.params.id);
    if (!profissional) {
      return res.status(404).json({ error: 'Profissional de saúde não encontrado.' });
    }
    res.status(200).json(profissional);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o profissional de saúde.' });
  }
};

// Buscar profissionais de saúde por nome
exports.buscarProfissionalPorNome = async (req, res) => {
  try {
    const nome = req.query.nome;
    const profissionais = await ProfissionalSaude.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${nome}%`,
        },
      },
    });
    res.status(200).json(profissionais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar profissionais por nome.' });
  }
};

// Cadastrar um novo profissional de saúde
exports.cadastrarProfissional = async (req, res) => {
  try {
    const { id, nome, especialidade, email, telefone, status } = req.body;
    const novoProfissional = await ProfissionalSaude.create({
      id: uuidv4(),
      nome,
      especialidade,
      email,
      telefone,
      status,
    });
    res.status(201).json(novoProfissional);
  } catch (error) {
    console.error('Erro ao cadastrar profissional:', error);
    res.status(500).json({ error: 'Erro ao cadastrar profissional de saúde.' });
  }
};

// Atualizar um profissional de saúde
exports.atualizarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especialidade, email, telefone, status } = req.body;

    const profissional = await ProfissionalSaude.findByPk(id);
    if (!profissional) {
      return res.status(404).json({ error: 'Profissional de saúde não encontrado.' });
    }

    profissional.nome = nome || profissional.nome;
    profissional.especialidade = especialidade || profissional.especialidade;
    profissional.email = email || profissional.email;
    profissional.telefone = telefone || profissional.telefone;
    profissional.status = status || profissional.status;

    await profissional.save();
    res.status(200).json(profissional);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o profissional de saúde.' });
  }
};

// Excluir um profissional de saúde
exports.deletarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const profissional = await ProfissionalSaude.findByPk(id);

    if (!profissional) {
      return res.status(404).json({ error: 'Profissional de saúde não encontrado.' });
    }

    await profissional.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o profissional de saúde.' });
  }
};
