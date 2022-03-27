const { Producto, Categoria, Usuario, Rol } = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRole = await Rol.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol ${rol} no esta registrado en la db`);
    }
}

const emailExiste = async (correo = '') => {
    // verificar si el correo existe
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    // verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProductoPorId = async (id) => {
    
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
};