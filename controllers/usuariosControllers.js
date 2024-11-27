const Usuario = require('../models/usuarios.js');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

// Buscar usuário por ID
exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error);
    res.status(500).json({ error: 'Erro ao buscar o usuário.' });
  }
};

// Buscar usuários por nome
exports.buscarUsuarioPorNome = async (req, res) => {
  try {
    const nome = req.query.nome;
    const usuarios = await Usuario.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${nome}%`,
        },
      },
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários por nome.' });
  }
};

// Cadastrar um novo usuário
exports.cadastrarUsuario = async (req, res) => {
  try {
    const { id, nome, email, usuario, pwd, nivel, status } = req.body;

    const novoUsuario = await Usuario.create({
      id: uuidv4(),
      nome,
      email,
      usuario,
      pwd,
      nivel,
      status
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

// Atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, pwd, nivel, status} = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Atualizar os dados do usuário
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.pwd = pwd || usuario.pwd;
    usuario.nivel = nivel || usuario.nivel;
    usuario.status = status || usuario.status;

    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};

// Excluir um usuário
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
};
