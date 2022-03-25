const { request } = require("express");
const { response } = require("express")
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");


const validarJwt = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // obtener usuario autehicado
        const usuario = await Usuario.findById(uid);

        if( !usuario ) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe'
            })
        }

        // verificar si el uid tiene estado en true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'token no valido - usuario con estado false'
            })
        }
        
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'token no valido',
        })
    }

}

module.exports = {
    validarJwt
}