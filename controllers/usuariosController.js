const { response } = require("express")
const Usuario = require("../models/Usuario")
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")

const usuariosGet = async (req, res = response) => {
    // const query = req.query
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    // TODO: validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.status(400).json({
        usuario
    })
}
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // hashear el password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // guardar en la db
    await usuario.save();

    res.status(201).json({
        ok: true,
        usuario
    })
}
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}


const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: "patch api"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}