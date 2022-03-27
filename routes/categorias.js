const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategorias, borrarCategoria } = require('../controllers/categoriasController');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJwt, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// obtener todas las categorias - public0
router.get('/', obtenerCategorias )

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria )

// crear una categoria por id - privado -  cualquier rol
router.post('/', [ 
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// actualizar una categoria por id - privado -  cualquiera con token valido
router.put('/:id', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategorias )

// borrar una categoria por id - admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)

module.exports = router;  
