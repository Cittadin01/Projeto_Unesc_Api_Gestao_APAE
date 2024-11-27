const Evento = require('../models/eventos.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os eventos
exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
};

// Buscar evento por ID
exports.listarEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o evento.' });
  }
};

// Buscar eventos por data
exports.listarEventosPorData = async (req, res) => {
  try {
    const { data } = req.query;
    const eventos = await Evento.findAll({
      where: {
        data: {
          [Op.eq]: data,
        },
      },
    });
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos por data.' });
  }
};

// Cadastrar um novo evento
exports.cadastrarEvento = async (req, res) => {
  try {
    const { id, descricao, comentario, data } = req.body;
    const novoEvento = await Evento.create({
      id: uuidv4(),
      descricao,
      comentario,
      data,
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error('Erro ao cadastrar evento:', error);
    res.status(500).json({ error: 'Erro ao cadastrar evento.' });
  }
};

// Atualizar um evento
exports.atualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, comentario, data } = req.body;

    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    evento.descricao = descricao || evento.descricao;
    evento.data = data || evento.data;
    evento.comentario = comentario || evento.comentario;

    await evento.save();
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o evento.' });
  }
};

// Excluir um evento
exports.deletarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    await evento.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o evento.' });
  }
};
