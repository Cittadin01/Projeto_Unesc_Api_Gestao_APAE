const AgendamentoSaude = require('../models/agendamentos.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os agendamentos
exports.listarAgendamentos = async (req, res) => {
  try {
    const agendamentos = await AgendamentoSaude.findAll();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};

// Buscar agendamento por ID
exports.buscarAgendamentoPorId = async (req, res) => {
  try {
    const agendamento = await AgendamentoSaude.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o agendamento.' });
  }
};

// Buscar agendamentos por data
exports.buscarAgendamentoPorData = async (req, res) => {
  try {
    const { data } = req.query;
    const agendamentos = await AgendamentoSaude.findAll({
      where: {
        data: {
          [Op.eq]: data,
        },
      },
    });
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos por data.' });
  }
};

// Cadastrar um novo agendamento
exports.cadastrarAgendamento = async (req, res) => {
  try {
    const { id, especialidade, comentario, data, aluno, profissional } = req.body;
    const novoAgendamento = await AgendamentoSaude.create({
      id: uuidv4(),
      especialidade,
      comentario,
      data,
      aluno,
      profissional,
    });
    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error('Erro ao cadastrar agendamento:', error);
    res.status(500).json({ error: 'Erro ao cadastrar agendamento.' });
  }
};

// Atualizar um agendamento
exports.atualizarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { especialidade, comentario, data, aluno, profissional } = req.body;

    const agendamento = await AgendamentoSaude.findByPk(id);
    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    agendamento.especialidade = especialidade || agendamento.especialidade;
    agendamento.comentario = comentario || agendamento.comentario;
    agendamento.data = data || agendamento.data;
    agendamento.aluno = aluno || agendamento.aluno;
    agendamento.profissional = profissional || agendamento.profissional;

    await agendamento.save();
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o agendamento.' });
  }
};

// Excluir um agendamento
exports.deletarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await AgendamentoSaude.findByPk(id);

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    await agendamento.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o agendamento.' });
  }
};
