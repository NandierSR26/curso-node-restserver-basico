const Role = require('../models/Role');
const Usuario = require("../models/Usuario")

const esRoleValido =  async(rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if(!existeRole) {
        throw new Error(`El rol ${rol} no esta registrado en la db`);
    }
}

const emailExiste = async(correo = '') => {
    // verificar si el correo existe
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    // verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = { 
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};