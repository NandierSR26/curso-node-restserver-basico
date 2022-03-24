const { response } = require("express")


const usuariosGet = (req, res = response) => {
    const query = req.query
    res.json({
        ok: true,
        msg: "get api - controlador",
        query
    })
}

const usuariosPut = (req, res = response) => {

    const { q, nombre='no name', apikey, page = 1, limit } = req.query
    
    res.status(400).json({
        ok: true,
        msg: "put api",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        ok: true,
        msg: "post api",
        nombre, 
        edad
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: "delete api"
    })
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