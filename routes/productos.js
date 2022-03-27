const { Router } = require('express');
const { check } = require('express-validator');

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares');

const { 
    crearProducto,
    obtenerProductos, 
    obtenerProducto, 
    actualizarProductos, 
    borrarProducto } = require('../controllers/productosController');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// obtener todas las categorias - public0
router.get('/', obtenerProductos )

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto )

// crear una categoria por id - privado -  cualquier rol
router.post('/', [ 
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto )

// actualizar una categoria por id - privado -  cualquiera con token valido
router.put('/:id', [
    validarJwt,
    // check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProductos )

// borrar una categoria por id - admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)

module.exports = router;  
