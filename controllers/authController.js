const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/Usuario");

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe"
            });
        }

        // verificar si el usuario esta activo
        if (usuario.estado === false) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario no existe"
            });
        }

        // verificar si el password es correcto
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        // generar el token
        const token = await generarJWT(usuario.id)

        return res.json({
            usuario, 
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador',
        })
    }
}

module.exports = {
    login
}